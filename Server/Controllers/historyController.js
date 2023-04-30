const { query, global_get, global_insert, global_delete, global_update } = require('../Global_imports/Global');

const { history_post_model, get_score } = require('../Models/historyModel');

const { admin, authorized } = require('../middleware/authorizations');

let status = 400, message = "the operation was not successful";
const get_history = (req, res) => {
    authorized(req, res, async () => {
        status = 400;
        const data = req.body;
        const user = res.locals.user;
        try {
            const history_exam_question = await query(`SELECT exam_id,exam.Name AS exam_Name,questions.Name AS question_Name,Answer,IsRight,created_at,exam.number_of_questions FROM history LEFT JOIN exam ON exam.Name LIKE '%${data.exam_Name || ""}%' INNER JOIN questions ON questions.Name=questions.Name  WHERE user_id = ${user.id} AND exam.id = exam_id AND questions.id = question_id`);
            if (!data.exam_Name && !history_exam_question[0]) {
                status = 204;
                message = "No Content";
            }
            else if (!history_exam_question[0]) {
                status = 404;
                message = "Not Found";
            }
            else {
                status = 200;
                message = [];
                for (let i = 0; i < history_exam_question.length; i += history_exam_question[i].number_of_questions) {
                    const history = {
                        "exam_Name": history_exam_question[i].exam_Name,
                        "created_at": history_exam_question[i].created_at,
                        "Number_of_questions": history_exam_question[i].number_of_questions
                    };
                    const questions = await query(`SELECT questions.Name,questions.Audio,questions.RightAnswer,questions.Wrong1,questions.Wrong2,questions.Wrong3,Answer,IsRight FROM questions LEFT JOIN exam ON exam.Name = '${history_exam_question[i].exam_Name}'  INNER JOIN history ON history.user_id=${user.id} AND history.exam_id=exam.id AND history.question_id=questions.id;`);
                    history.questions = questions;
                    const score = await get_score(user.id, history_exam_question[i].exam_id);
                    history.score = score;
                    message.push(history);
                }
            }

        } catch (err) {
            status = 500;
            console.log(err);
            message = err.message;
        }
        res.status(status).send(message);
    });
};

const post_history = (req, res) => {
    authorized(req, res, async () => {
        status = 400;
        const data = req.body;
        const user = res.locals.user;
        const valid = user && data.exam_Name && data.questions_answers;
        if (valid) {
            try {
                const exam_questions = await query(`SELECT exam_id,exam.Name AS exam_Name,exam.number_of_questions,question_id,questions.Name AS question_Name,questions.RightAnswer FROM exam_question INNER JOIN exam ON exam.Name='${data.exam_Name}' AND exam_id=exam.id INNER JOIN questions ON question_id=questions.id;`);
                if (!exam_questions[0]) {
                    status = 404;
                    message = "Not Found";
                }
                else {
                    const checkexist = await query(`SELECT * FROM history WHERE user_id = '${user.id}' AND exam_id = '${exam_questions[0].exam_id}'`);
                    if (checkexist[0]) {
                        status = 403;
                        message = "already existe";
                    }
                    else {
                        let number_of_questions = 0;
                        const questions_answers = Array.isArray(data.questions_answers) ? data.questions_answers : [data.questions_answers];
                        const history = history_post_model(questions_answers, user, exam_questions);
                        for (let i = 0; i < history.length; i++) {
                            const insertion = await global_insert("history", history[i]);
                            if (insertion) {
                                number_of_questions++;
                            }
                        }
                        if (number_of_questions === exam_questions[0].number_of_questions) {
                            const score = await get_score(user.id, exam_questions[0].exam_id);
                            await global_update("users", { "last_score": score }, "id", user.id);
                            status = 200;
                            message = {
                                msg: "history saved successfully",
                                "score": score
                            };
                        }
                        else {
                            await query(`DELETE FROM history WHERE user_id=${user.id} AND exam_id='${exam_questions[0].exam_id}'`);
                            message = "faild to save";
                        }
                    }
                }
            } catch (err) {
                status = 500;
                console.log(err);
                message = err.message;
            }

        }
        else {
            message = "requird fields was not sent";
        }
        res.status(status).send(message);
    });
};

const put_history = (req, res) => {
    authorized(req, res, async () => {
        status = 400;
        const data = req.body;
        const user = res.locals.user;
        const valid = user && data.exam_Name && data.questions_answers;
        if (valid) {
            try {
                const exam_questions = await query(`SELECT exam_id,exam.Name AS exam_Name,exam.number_of_questions,question_id,questions.Name AS question_Name,questions.RightAnswer FROM exam_question INNER JOIN exam ON exam.Name='${data.exam_Name}' AND exam_id=exam.id INNER JOIN questions ON question_id=questions.id;`);
                if (!exam_questions[0]) {
                    status = 404;
                    message = "Not Found";
                }
                else {
                    const checkexist = await query(`SELECT * FROM history WHERE user_id = '${user.id}' AND exam_id = '${exam_questions[0].exam_id}'`);
                    if (!checkexist[0]) {
                        status = 404;
                        message = "Not Found";
                    }
                    else {
                        let number_of_questions = 0;
                        const questions_answers = Array.isArray(data.questions_answers) ? data.questions_answers : [data.questions_answers];
                        const history = history_post_model(questions_answers, user, exam_questions);
                        for (let i = 0; i < history.length; i++) {
                            const update = await query(`UPDATE history SET Answer=? ,IsRight=? WHERE user_id = ${user.id} AND exam_id ='${history[i].exam_id}' AND question_id= '${history[i].question_id}'`, [history[i].Answer, history[i].IsRight]); //global_update("history", set, `user_id = ${user.id} AND exam_id ='${history[i].exam_id}' AND question_id= `, history[i].question_id); //global_insert("history", history[i]);
                            if (update.affectedRows > 0) {
                                number_of_questions++;
                            }
                        }
                        if (number_of_questions === exam_questions[0].number_of_questions) {
                            const score = await get_score(user.id, exam_questions[0].exam_id);
                            await global_update("users", { "last_score": score }, "id", user.id);
                            status = 200;
                            message = {
                                msg: "history saved successfully",
                                "old_score": user.last_score,
                                "score": score
                            };
                        }
                        else {
                            message = "faild to update";
                        }
                    }
                }
            } catch (err) {
                status = 500;
                console.log(err);
                message = err.message;
            }

        }
        else {
            message = "requird fields was not sent";
        }
        res.status(status).send(message);
    });

};

const delete_history = (req, res) => {
    admin(req, res, async () => {
        status = 400;
        try {
            const find_exam = await query(`SELECT exam_id FROM history WHERE exam_id=(SELECT id FROM exam WHERE Name = '${req.body.exam_Name}')`);
            if (!find_exam[0]) {
                status = 404;
                message = "Not Found";
            }
            else {
                const del = await global_delete('history', 'exam_id', find_exam[0].exam_id);
                if (del) {
                    status = 200;
                    message = `(${req.body.exam_Name}) deleted from history`;
                }
                else {
                    message = `could not delete ( ${req.body.exam_Name} ) from history `;
                }
            }
        } catch (err) {
            status = 500;
            console.log(err);
            message = err.message;
        }
        res.status(status).send(message);
    });

};

module.exports = { get_history, post_history, put_history, delete_history };