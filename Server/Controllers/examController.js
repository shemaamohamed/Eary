const { randomstring, query, global_get, global_insert, global_delete } = require('../Global_imports/Global');

const { exam_model, exam_get, exam_question, defaults, datasql } = require('../Models/examModel');


/*exam table[
Id (auto incremented),
Name (requird , unique),
Discription (optional),
number_of_questions
] */

get_exams = async (req, res) => {
    data = req.body;
    try {
        const exams = await exam_get(data.Name);
        if (!exams[0]) {
            res.sendStatus(204);
        }
        exams.forEach(async element => {
            const questions = await query(`SELECT questions.Name,questions.Audio,questions.RightAnswer,questions.Wrong1,questions.Wrong2,questions.Wrong3 FROM questions LEFT JOIN exam ON exam.Name = '${element.Name}' INNER JOIN exam_question ON question_id=questions.id AND exam_id=exam.id`);
            element.questions = questions;
            if (exams.indexOf(element) === exams.length - 1) {
                res.send(exams);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err });
    }
};
post_exams = async (req, res) => {
    const data = exam_model(req, randomstring.generate());
    const { questions, ...datafilterd } = data;
    if (data.Name) {
        try {
            const examByName = await exam_get(data.Name);
            if (examByName[0]) {
                res.status(403).send("already excite");
            }
            else {
                const insertion_exam = await global_insert("exam", datafilterd);
                if (questions) {
                    if (Array.isArray(questions)) {
                        data.questions.forEach(async question => {
                            const qstn = await global_get("questions", "Name", question);
                            const exam_question = {
                                "exam_id": data.id,
                                "question_id": qstn[0].id
                            };
                            await global_insert("exam_question", exam_question);
                        });
                    }
                    else {
                        const qstn = await global_get("questions", "Name", questions);
                        const exam_question = {
                            "exam_id": data.id,
                            "question_id": qstn[0].id
                        };
                        await global_insert("exam_question", exam_question);
                    }
                }
                insertion_exam && data.questions ? res.send(`exam added with ${data.number_of_questions} questions`) :
                    insertion_exam ? res.send(`exam added but with no questions`) :
                        res.status(400).send("the operation could not be completed");

            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    }
    else {
        res.status(400).send("requird fields was not sent");
    }
};
put_exams = async (req, res) => {
    const data = req.body;
    const exam = await global_get("exam", "Name", data.Name);
    const data_sql = datasql(data);
    let req_message;
    let update_e = `UPDATE exam
    SET Name = ${data_sql.Name},Discription=${data_sql.Discription}
    WHERE Name='${data.Name}'`;
    if (!data.Name) {
        res.sendStatus(404);
    }
    else if (!exam[0]) {
        res.sendStatus(404);
    }
    else {
        if (data.questions) {
            const qstn = await global_get("questions", "Name", data.questions);
            if (!qstn[0]) {
                res.status(404).send(`${data.questions} does not excite`);
            }
            else {
                try {
                    const haveqstn = await query(`SELECT * FROM exam_question WHERE exam_id='${exam[0].id}' AND question_id='${qstn[0].id}'`);
                    if (haveqstn[0]) {
                        await query(`DELETE FROM exam_question WHERE exam_id='${exam[0].id}' AND question_id='${qstn[0].id}'`);
                        update_e = `UPDATE exam SET Name = ${data_sql.Name}, number_of_questions = number_of_questions - 1,Discription=${data_sql.Discription}
                          WHERE Name='${data.Name}'`;
                        req_message = "one question deleted";
                    }
                    else {
                        await query(`INSERT INTO exam_question SET exam_id='${exam[0].id}' , question_id='${qstn[0].id}'`);
                        update_e = `UPDATE exam SET Name = ${data_sql.Name}, number_of_questions = number_of_questions + 1,Discription=${data_sql.Discription}
                          WHERE Name='${data.Name}'`;
                        req_message = "one question added";
                    }
                }
                catch (err) {
                    console.log(err);
                    res.status(500).json({ err: err });
                }

            }
        }
        const update_exam = await query(update_e);
        update_exam.affectedRows > 0 ? res.send(req_message) : res.status(400).send("something went wrong");
    }
};

delete_exams = async (req, res) => {
    const data = req.body;
    if (!data.Name) {
        res.sendStatus(404);
    }
    else {
        try {
            const examByName = await exam_get(data.Name);
            if (!examByName[0]) {
                res.sendStatus(404);
            }
            else {
                const del = await global_delete("exam", "Name", data.Name);
                del ? res.send("element deleted") : res.status(400).send("could not delete");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    }

};
module.exports = { get_exams, post_exams, put_exams, delete_exams };