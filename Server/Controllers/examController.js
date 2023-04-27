const { randomstring, query, global_get, global_insert, global_delete, global_update } = require('../Global_imports/Global');

const { exam_model, exam_get, exam_question, datasql } = require('../Models/examModel');


/*exam table[
Id (auto incremented),
Name (requird , unique),
Discription (optional),
number_of_questions
] */
let status = 400, message = "the operation was not successful";
get_exams = async (req, res) => {
    data = req.body;
    const exams = await exam_get(data.Name);
    if (!data.Name && !exams[0]) {
        status = 204;
        message = "no content";
    }
    else if (!exams[0]) {
        status = 404;
        message = "Not Found";
    }
    else {
        try {
            message = [];
            for (let i = 0; i < exams.length; i++) {
                const questions = await query(`SELECT questions.Name,questions.Audio,questions.RightAnswer,questions.Wrong1,questions.Wrong2,questions.Wrong3 FROM questions LEFT JOIN exam ON exam.Name = '${exams[i].Name}' INNER JOIN exam_question ON question_id=questions.id AND exam_id=exam.id`);
                exams[i].questions = questions;
                status = 200;
                message.push(exams[i]);
            }

        } catch (err) {
            console.log(err);
            status = 500;
            message = err;
        }
    }
    res.status(status).send(message);
};
post_exams = async (req, res) => {
    const data = exam_model(req, randomstring.generate());
    let { questions, ...datafilterd } = data;
    datafilterd.number_of_questions = 0;
    const checkexist = await exam_get(data.Name);
    if (!data.Name) {
        message = "requird fields was not sent";
    }
    else if (checkexist[0]) {
        status = 403; message = "already existe";
    }
    else {
        const insertion_exam = await global_insert("exam", datafilterd);
        let notfound = [];
        try {
            if (!insertion_exam) {
                message = "could not add exam";
            }
            else if (questions) {
                let insertion = false;
                let exam_question = {
                    "exam_id": "",
                    "question_id": ""
                };
                if (Array.isArray(questions)) {
                    for (let i = 0; i < questions.length; i++) {
                        const qstn = await global_get("questions", "Name", questions[i]);
                        if (qstn[0]) {
                            exam_question = {
                                "exam_id": data.id,
                                "question_id": qstn[0].id
                            };
                            const insertion = await global_insert("exam_question", exam_question);
                            if (insertion)
                                datafilterd.number_of_questions += 1;
                        }
                        else {
                            notfound.push(questions[i]);
                        }
                    }
                }
                else {
                    const qstn = await global_get("questions", "Name", questions);
                    if (qstn[0]) {
                        exam_question = {
                            "exam_id": data.id,
                            "question_id": qstn[0].id
                        };
                        insertion = await global_insert("exam_question", exam_question);
                        if (insertion)
                            datafilterd.number_of_questions = 1;
                    }
                    else {
                        notfound.push(questions);
                    }
                }
                await query(`UPDATE exam set number_of_questions='${datafilterd.number_of_questions}' WHERE id='${data.id}'`);
            }
            status = 200; message = (`exam added with ${datafilterd.number_of_questions} questions `) + (notfound[0] ? `( ${notfound} ) Not Found` : "");
        } catch (err) {
            await global_delete("exam", "id", datafilterd.id);
            console.log(err);
            status = 500; message = err;
        }
    }
    res.status(status).send(message);
};
put_exams = async (req, res) => {
    const data = req.body;
    const exam = await global_get("exam", "Name", data.Name);
    if (!data.Name) {
        status = 404;
        message = "Not Found";
    }
    else if (!exam[0]) {
        status = 404;
        message = "Not Found";
    }
    else {
        const data_sql = datasql(data, exam);
        try {
            if (data.questions) {
                let added = [], deleted = [], notfound = [];
                if (Array.isArray(data.questions)) {
                    for (let i = 0; i < data.questions.length; i++) {
                        const qstn = await global_get("questions", "Name", data.questions[i]);
                        if (!qstn[0]) {
                            notfound.push(data.questions[i]);
                        }
                        else {
                            const haveqstn = await query(`SELECT * FROM exam_question WHERE exam_id='${exam[0].id}' AND question_id='${qstn[0].id}'`);
                            if (haveqstn[0]) {
                                const del = await query(`DELETE FROM exam_question WHERE exam_id='${exam[0].id}' AND question_id='${qstn[0].id}'`);
                                if (del.affectedRows > 0) {
                                    data_sql.number_of_questions -= 1;
                                    deleted.push(qstn[0].Name);
                                }
                            }
                            else {
                                const insrt = await query(`INSERT INTO exam_question SET exam_id='${exam[0].id}' , question_id='${qstn[0].id}'`);
                                if (insrt.affectedRows > 0) {
                                    data_sql.number_of_questions += 1;
                                    added.push(qstn[0].Name);
                                }

                            }
                        }
                    }
                }
                else {
                    const qstn = await global_get("questions", "Name", data.questions);
                    if (!qstn[0]) {
                        notfound.push(data.questions);
                    }
                    else {
                        const haveqstn = await query(`SELECT * FROM exam_question WHERE exam_id='${exam[0].id}' AND question_id='${qstn[0].id}'`);
                        if (haveqstn[0]) {
                            const del = await query(`DELETE FROM exam_question WHERE exam_id='${exam[0].id}' AND question_id='${qstn[0].id}'`);
                            if (del.affectedRows > 0) {
                                data_sql.number_of_questions -= 1;
                                deleted.push(qstn[0].Name);
                            }
                        }
                        else {
                            const insrt = await query(`INSERT INTO exam_question SET exam_id='${exam[0].id}' , question_id='${qstn[0].id}'`);
                            if (insrt.affectedRows > 0) {
                                data_sql.number_of_questions += 1;
                                added.push(qstn[0].Name);
                            }

                        }
                    }
                }
                status = added[0] || deleted[0] ? 200 : 404;
                message = "exam updated " + (added[0] ? `( ${added} ) added , ` : "") + (deleted[0] ? `( ${deleted} ) deleted , ` : "") + (notfound[0] ? `( ${notfound} ) Not Found` : "");

            }
            const update_exam = await global_update("exam", data_sql, "Name", data.Name);
            if (!update_exam) {
                message = "could not update exam";
            }
        }
        catch (err) {
            console.log(err);
            status = 500;
            message = err;
        }
    }
    res.status(status).send(message);
};

delete_exams = async (req, res) => {
    const data = req.body;
    if (!data.Name) {
        status = 404;
        message = "Not Found";
    }
    else {
        try {
            const examByName = await exam_get(data.Name);
            if (!examByName[0]) {
                status = 404;
                message = "Not Found";
            }
            else {
                const del = await global_delete("exam", "Name", data.Name);
                if (del) {
                    status = 200;
                    message = "element deleted";
                }
                else {
                    message = "could not delete";
                }

            }
        } catch (err) {
            console.log(err);
            status = 500;
            message = err;
        }
    }
    res.status(status).send(message);
};
module.exports = { get_exams, post_exams, put_exams, delete_exams };