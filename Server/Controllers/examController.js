const { exams, quistions, exam_quistion, connection, randomstring } = require('../Global_imports/Global');




/*exam table[
Id (auto incremented),
Name (requird , unique),
Discription (optional),
number_of_questions
] */

get_exams = (req, res) => {
    data = req.body;
    if (!exams[0]) {
        res.sendStatus(204);
    }
    else if (data.Name) {
        const examByName = exams.find(q => q.Name === data.Name);
        if (!examByName)
            res.sendStatus(404);
        else {
            res.send(examByName);
        }
    }
    else {
        res.send(exams);
    }
};

post_exams = (req, res) => {
    const data = { "id": randomstring.generate(), ...req.body };
    const examByName = exams.find(q => q.Name === data.Name);
    if (examByName) {
        res.status(403).send("already excite");
    }
    else {
        exams.push(data);
        res.send(`element added`);
    }


};

put_exams = (req, res) => {
    const data = req.body;
    const examByName = exams.find(q => q.Name === data.Name);
    if (!examByName) {
        res.sendStatus(404);
    }
    else {
        examByName.Name = data.Name || examByName.Name;
        examByName.number_of_questions = data.number_of_questions || examByName.number_of_questions;
        examByName.Discription = data.Discription || examByName.Discription;
        res.send("element updated");
    }

};

delete_exams = (req, res) => {
    const data = req.body;
    const examByName = exams.find(q => q.Name === data.Name);
    const exam_index = exams.indexOf(examByName);
    if (!examByName) {
        res.sendStatus(404);
    }
    else {
        exams.splice(exam_index, 1);
        res.send("element deleted");

    }

};
module.exports = { get_exams, post_exams, put_exams, delete_exams };