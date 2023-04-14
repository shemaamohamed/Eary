const multer = require('multer');
const fs = require("fs");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Audios');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.id} ${file.originalname}`);
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
            res.status(400).send(err.message);
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
            res.status(400).send(err.message);
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