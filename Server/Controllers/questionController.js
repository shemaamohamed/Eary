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
    const data = req.body;
    const qstn = quistions.find(q => q.id === data.id);
    if (qstn) {
        res.status(403).send("already excite");
    }
    else {
        quistions.push({
            "id": data.id,
            "text": data.text,
            "Audio": data.Audio,
            "rightAnswer": data.rightAnswer
        });
        res.send("element added");
    }
};

exports.put_quistions = (req, res) => {
    const data = req.body;
    const qstn = quistions.find(q => q.id === data.id);
    if (!qstn) {
        res.sendStatus(404);
    }
    else {
        qstn.text = data.text;
        qstn.Audio = data.Audio;
        qstn.rightAnswer = data.rightAnswer;
        res.send("element updated");
    }

};

exports.delete_quistions = (req, res) => {
    const data = req.body;
    const qstn = quistions.find(q => q.id === data.id);
    const qstn_index = quistions.indexOf(qstn);
    if (!qstn) {
        res.sendStatus(404);
    }
    else {
        quistions.splice(qstn_index, 1);
        res.send("element deleted");

    }

};

