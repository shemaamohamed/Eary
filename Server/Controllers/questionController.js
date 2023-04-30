const { fs, randomstring, global_get, global_insert, global_delete, global_update } = require('../Global_imports/Global');

const { upload, unlinkfile, sizeMB } = require('../Global_imports/file_upload');

const { question_model, question_get, question_get_search, datasql } = require('../Models/questionModel');

const { admin } = require('../middleware/authorizations');
/*question table [
Id (auto incremented),
Name (requird , unique),
Audio (requird),
RightAnswer (requird),
Wrong1 (requird),
Wrong2 (requird),
Wrong3 (requird),
Discription (optional)
]*/
let status = 400, message = "the operation was not successful";
const get_questions = async (req, res) => {
    admin(req, res, async () => {
        const data = req.body;
        const questions = await question_get_search(data.Name);
        if (!data.Name && !questions[0]) {
            status = 204;
            message = "no content";
        }
        else if (!questions[0]) {
            status = 404;
            message = "Not Found";
        }
        else {
            status = 200;
            message = questions;
        }
        res.status(status).send(message);
    });
};

const post_questions = (req, res) => {
    admin(req, res, async () => {
        upload(req, res, async (err) => {
            status = 400;
            if (err) {
                if (err.message == "File too large") {
                    message = err.message + ` the maximux file size is ${sizeMB} megabyte`;
                }
                else {
                    console.log(err);
                    message = err.message;
                }
            }
            else {
                const file = req.file;
                const data = question_model(req, randomstring.generate(), file);
                const valid = data.Name && file && data.RightAnswer && data.Wrong1 && data.Wrong2 && data.Wrong3;
                if (valid) {
                    const checkexist = await question_get(data.Name);
                    if (checkexist[0]) {
                        unlinkfile(file);
                        status = 403;
                        message = "already existe";
                    }
                    else {
                        const insertion = await global_insert("questions", data);
                        if (insertion) {
                            status = 200;
                            message = "element added";
                        }
                        else {
                            unlinkfile(file);
                            message = "could not add question";
                        }
                    }
                }
                else {
                    unlinkfile(file);
                    message = "requird fields was not sent";
                }
            }
            res.status(status).send(message);
        });
    });
};

const put_questions = (req, res) => {
    admin(req, res, async () => {
        upload(req, res, async (err) => {
            status = 400;
            if (err) {
                if (err.message == "File too large") {
                    message = err.message + ` the maximum file size is ${sizeMB} megabyte`;
                }
                else {
                    message = err.message;
                }
            }
            else {
                const file = req.file;
                const data = req.body;
                if (file) { data.Audio = file.path; }
                const question = await global_get("questions", "Name", data.Name);
                if (!data.Name) {
                    unlinkfile(file);
                    status = 404;
                    message = "Not Found";
                }
                else if (!question[0]) {
                    unlinkfile(file);
                    status = 404;
                    message = "Not Found";
                }
                else {
                    const old_audio = question[0].Audio;
                    const data_sql = datasql(data, question);
                    const update_question = await global_update("questions", data_sql, "Name", data.Name);
                    if (update_question) {
                        status = 200;
                        message = "element updated";
                        try {
                            if (file) {
                                fs.unlink(old_audio, async (err) => {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }
                                });
                            }
                        } catch (error) {
                            unlinkfile(file);
                            console.log(err);
                            status = 500;
                            message = err.message;
                        }
                    }
                    else {
                        message = "could not update question";
                    }
                }
            }
            res.status(status).send(message);
        });
    });
};

const delete_questions = (req, res) => {
    admin(req, res, async () => {
        status = 400;
        const data = req.body;
        if (!data.Name) {
            status = 404;
            message = "Not Found";
        }
        else {
            const questionByName = await question_get(data.Name);
            if (!questionByName[0]) {
                status = 404;
                message = "Not Found";
            }
            else {
                const del = await global_delete("questions", "Name", data.Name);
                if (del) {
                    status = 200;
                    message = "element deleted";
                    try {
                        fs.unlink(questionByName[0].Audio, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    } catch (err) {
                        console.log(err);
                        status = 500;
                        message = err.message;
                    }
                }
                else {
                    message = "could not delete";
                }
            }

        }
        res.status(status).send(message);
    });
};

module.exports = { get_questions, post_questions, put_questions, delete_questions };