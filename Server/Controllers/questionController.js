const { util, fs, randomstring, query, global_get, global_insert, global_delete } = require('../Global_imports/Global');

const { upload, unlinkfile, } = require('../Global_imports/file_upload');

const { question_model, question_get, datasql } = require('../Models/questionModel');

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

get_quistions = async (req, res) => {
    const data = req.body;
    try {
        const results = await question_get(data.Name);
        res.send(results[0] ? results : 204);
    } catch (err) {
        res.status(500).json({ err: err });
    }
};

post_quistions = (req, res) => {

    upload(req, res, async (err) => {
        const file = req.file;
        const data = question_model(req, randomstring.generate(), file);
        const valid = data.Name && file && data.RightAnswer && data.Wrong1 && data.Wrong1 && data.Wrong2 && data.Wrong3;

        if (valid) {
            try {
                const checkexist = await question_get(data.Name);
                if (checkexist[0]) {
                    unlinkfile(file, err);
                    res.status(403).send("already excite");
                }
                else {
                    const insertion = global_insert("questions", data);

                    if (insertion) {
                        res.status(200).send("element added");
                    }
                    else {
                        res.status(400).send("the operation couldn not be completed");
                    }
                }
            } catch (err) {
                unlinkfile(file, err);
                console.log(err);
                res.status(500).json({ err: err });
            }
        }
        else {
            res.status(400).send("requird fields was not sent");
        }


    });
};

put_quistions = (req, res) => {

    upload(req, res, async (err) => {
        const file = req.file;
        const data = question_model(req, "", file);
        data.Newname = req.body.Newname;
        let filepathsql;
        if (file) { filepathsql = file.path.slice(0, 6) + "\\" + file.path.slice(6); }
        if (!data.Name) {
            unlinkfile(file, err);
            res.sendStatus(404);
        }
        else {
            try {
                const checkexist = await question_get(data.Name);
                if (!checkexist[0]) {
                    unlinkfile(file, err);
                    res.sendStatus(404);
                }
                else {
                    const data_sql = datasql(data, file, filepathsql);

                    const update_q = `UPDATE questions
            SET Name = ${data_sql.Name},Audio=${data_sql.Audio}, RightAnswer = ${data_sql.RightAnswer},Wrong1=${data_sql.Wrong1},Wrong2=${data_sql.Wrong2},Wrong3=${data_sql.Wrong3},Discription=${data_sql.Discription}
            WHERE Name='${data.Name}'`;
                    try {
                        const results = await question_get(data.Name);
                        try {
                            if (file) {
                                fs.unlink(results[0].Audio, async (err) => {
                                    if (err) {
                                        console.error(err);
                                        return;
                                    }
                                    const update = await query(update_q);
                                });
                            }

                        } catch (error) {
                            unlinkfile(file, err);
                            res.status(500).json({ err: err });
                        }
                    } catch (error) {
                        unlinkfile(file, err);
                        res.status(500).json({ err: err });
                    }
                }
                res.send("element updated");
            } catch (error) {
                unlinkfile(file, err);
                res.status(500).json({ err: err });
            }
        }
    });

};

delete_quistions = async (req, res) => {
    const data = req.body;
    if (!data.Name) {
        res.sendStatus(404);
    }
    try {
        const audioquery = await query("SELECT Audio FROM questions WHERE Name=?", data.Name);
        if (!audioquery[0]) {
            res.sendStatus(404);
        }
        else {
            fs.unlink(audioquery[0].Audio, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            const del = await global_delete("questions", "Name", data.Name);

            del ? res.send("element deleted") : res.sendStatus(400).send("could not delete");
        }

    } catch (err) {
        res.status(500).json({ err: err });
    }
};

module.exports = { get_quistions, post_quistions, put_quistions, delete_quistions };