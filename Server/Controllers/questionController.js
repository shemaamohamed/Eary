const { query } = require('express');
const { fs, quistions, multer, connection, randomstring } = require('../Global_imports/Global');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Audios');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.Name} ${randomstring.generate()}.mp3`);
    }
});

const sizeMB = 20;

const filesize = sizeMB * 1024 * 1024;

const upload = multer({
    storage: storage, limits: { fileSize: filesize }, fileFilter: (req, file, cb) => {
        if (file.mimetype == "audio/mpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only mp3 files are allowed'));
        }
    }
}).single("audio");


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

get_quistions = (req, res) => {
    const data = req.body;
    // if (!quistions[0]) {
    //     res.sendStatus(204);
    // }
    // else if (data.Name) {
    //     const qstnByName = quistions.find(q => q.Name === data.Name);
    //     if (!qstnById && !qstnByName[0])
    //         res.sendStatus(404);
    //     else {
    //         res.send(qstnByName);
    //     }
    // }
    // else {
    //     res.send(quistions);
    // }
    let query;
    if (data.Name) {
        query = `SELECT  Name, Audio, RightAnswer,Wrong1, Wrong2, Wrong3, Discription FROM questions WHERE Name LIKE '%${data.Name}%'`;
    }
    else {
        query = `SELECT  Name, Audio, RightAnswer,Wrong1, Wrong2, Wrong3, Discription FROM questions`;
    }
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        if (!results[0]) {
            res.sendStatus(404);
        }
        else {
            res.send(results);
        }

    });

};

post_quistions = (req, res) => {

    upload(req, res, (err) => {
        const file = req.file;
        const filepathsql = file.path.slice(0, 6) + "\\" + file.path.slice(6);
        const data = { "id": randomstring.generate(), "Audio": file.path, ...req.body };
        //const qstnByName = quistions.find(q => q.Name === data.Name);
        // if (qstnByName) {
        //     res.status(403).send("already excite");
        // }
        // else {
        //     quistions.push(data);
        //     res.send(`element added`);
        // }
        const query = `INSERT INTO questions(id, Name, Audio, RightAnswer, Wrong1, Wrong2, Wrong3, Discription) 
        VALUES ('${data.id}','${data.Name || ""}','${filepathsql || ""}','${data.RightAnswer || ""}','${data.Wrong1 || ""}','${data.Wrong2 || ""}','${data.Wrong3 || ""}','${data.Discription || ""}')`;
        connection.query(query, (error, results, fields) => {
            if (error) {
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                res.status(400).send(error.sqlMessage);
            }
            res.send(`element added`);
        });
    });
};

put_quistions = (req, res) => {

    upload(req, res, (err) => {
        const data = req.body;
        const file = req.file;
        let filepathsql;
        if (file) { filepathsql = file.path.slice(0, 6) + "\\" + file.path.slice(6); }

        if (!data.Name) {
            if (file) {
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }

            res.sendStatus(404);
        }
        else {
            currentname = "'" + data.Name + "'" + ")";
            defaults = {
                "Name": "(SELECT Name FROM questions WHERE Name=" + currentname,
                "Audio": "(SELECT Audio FROM questions WHERE Name=" + currentname,
                "RightAnswer": "(SELECT RightAnswer FROM questions WHERE Name=" + currentname,
                "Wrong1": "(SELECT Wrong1 FROM questions WHERE Name=" + currentname,
                "Wrong2": "(SELECT Wrong2 FROM questions WHERE Name=" + currentname,
                "Wrong3": "(SELECT Wrong3 FROM questions WHERE Name=" + currentname,
                "Discription": "(SELECT Discription FROM questions WHERE Name=" + currentname
            };

            datasql = {
                "Name": data.Newname ? "'" + data.Newname + "'" : defaults.Name,
                "Audio": file ? "'" + filepathsql + "'" : defaults.Audio,
                "RightAnswer": data.RightAnswer ? "'" + data.RightAnswer + "'" : defaults.RightAnswer,
                "Wrong1": data.Wrong1 ? "'" + data.Wrong1 + "'" : defaults.Wrong1,
                "Wrong2": data.Wrong2 ? "'" + data.Wrong2 + "'" : defaults.Wrong2,
                "Wrong3": data.Wrong3 ? "'" + data.Wrong3 + "'" : defaults.Wrong3,
                "Discription": data.Discription ? "'" + data.Discription + "'" : defaults.Discription
            };

            const query = `UPDATE questions
        SET Name = ${datasql.Name},Audio=${datasql.Audio}, RightAnswer = ${datasql.RightAnswer},Wrong1=${datasql.Wrong1},Wrong2=${datasql.Wrong2},Wrong3=${datasql.Wrong3},Discription=${datasql.Discription}
        WHERE Name='${data.Name}'`;
            if (file) {
                connection.query(defaults.Audio, (error, results, fields) => {
                    if (error) {
                        fs.unlink(file.path, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                        res.status(400).send(error.sqlMessage + "\n" + defaults.Audio);
                    }
                    else if (!results[0]) {
                        fs.unlink(file.path, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                        res.sendStatus(404);
                    }
                    else {
                        fs.unlink(results[0].Audio, (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            connection.query(query, (error, results, fields) => {
                                if (error) {
                                    fs.unlink(file.path, (err) => {
                                        if (err) {
                                            console.error(err);
                                            return;
                                        }
                                    });
                                    res.status(400).send(error.sqlMessage + "\n" + query);
                                }
                                res.send("element updated");
                            });
                        });
                    }

                });
            }
            else {
                connection.query(defaults.Name, (error, results, fields) => {
                    if (error) {
                        res.status(400).send(error.sqlMessage + "\n" + defaults.Name);
                    }
                    else if (!results[0]) {
                        res.sendStatus(404);
                    }
                    else {
                        connection.query(query, (error, results, fields) => {
                            if (error) {
                                res.status(400).send(error.sqlMessage + "\n" + query);
                            }
                            res.send("element updated");
                        });
                    }
                });
            }



        }

    });

};

delete_quistions = (req, res) => {
    const data = req.body;
    currentname = "'" + data.Name + "'" + ")";
    const query = `DELETE FROM questions WHERE Name='${data.Name}'`;
    const audioquery = "(SELECT Audio FROM questions WHERE Name=" + currentname;
    if (!data.Name) {
        res.sendStatus(404);
    }
    else {
        connection.query(audioquery, (error, results, fields) => {
            if (error) {
                res.status(400).send(error.sqlMessage + "\n" + audioquery);
            }
            else if (!results[0]) {
                res.sendStatus(404);
            }
            else {
                fs.unlink(results[0].Audio, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                connection.query(query, (error, results, fields) => {
                    if (error) {
                        res.status(400).send(error.sqlMessage + "\n" + query);
                    }
                    res.send("element deleted");
                });
            }

        });
    }

};

module.exports = { get_quistions, post_quistions, put_quistions, delete_quistions };