const multer = require('multer');
const fs = require("fs");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Audios');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.id} ${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).single("audio");

const quistions = [];

exports.get_quistions = (req, res) => {
    if (!quistions[0]) {
        res.sendStatus(204);
    }
    else {
        res.send(quistions);
    }
};

exports.post_quistions = (req, res) => {

    upload(req, res, (err) => {
        const data = req.body;
        const file = req.file;
        const qstn = quistions.find(q => q.id === data.id);
        if (err) {
            res.status(400).send("Something went wrong!");
        }
        else if (qstn) {
            res.status(403).send("already excite");
        }
        else {
            quistions.push({
                "id": data.id,
                "text": data.text,
                "Audio": file.path,
                "rightAnswer": data.rightAnswer
            });
            res.send(`element added`);
        }
    });


};

exports.put_quistions = (req, res) => {

    upload(req, res, (err) => {
        const data = req.body;
        const file = req.file;
        const qstn = quistions.find(q => q.id === data.id);
        if (err) {
            res.status(400).send("Something went wrong!");
        }
        else if (!qstn) {
            res.sendStatus(404);
        }
        else {
            qstn.text = data.text || qstn.text;
            qstn.rightAnswer = data.rightAnswer || qstn.rightAnswer;
            if (file) {
                fs.unlink(qstn.Audio, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
                qstn.Audio = file.path;
            }
            res.send("element updated");
        }
    });

};

exports.delete_quistions = (req, res) => {
    const data = req.body;
    const qstn = quistions.find(q => q.id === data.id);
    const qstn_index = quistions.indexOf(qstn);
    if (!qstn) {
        res.sendStatus(404);
    }
    else {

        fs.unlink(qstn.Audio, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        quistions.splice(qstn_index, 1);
        res.send("element deleted");

    }

};