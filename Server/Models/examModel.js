const { query } = require("../Global_imports/Global");

const exam_model = (request, randomstring) => {
    return {
        "id": randomstring,
        "Name": request.body.Name,
        "number_of_questions": request.body.questions ? Array.isArray(request.body.questions) ? request.body.questions.length : 1 : 0,
        "Discription": request.body.Discription,
        "questions": request.body.questions
    };
};

const defaults = (Name) => {
    currentname = "'" + Name + "'" + ")";
    return {
        "Name": "(SELECT Name FROM exam WHERE Name=" + currentname,
        "Number_of_questions": "(SELECT Number_of_questions FROM exam WHERE Name=" + currentname,
        "Discription": "(SELECT Discription FROM exam WHERE Name=" + currentname
    };
};

const datasql = (data) => {
    return {
        "Name": data.Newname ? "'" + data.Newname + "'" : defaults(data.Name).Name,
        "Number_of_questions": data.Number_of_questions ? "'" + data.Number_of_questions + "'" : defaults(data.Name).Number_of_questions,
        "Discription": data.Discription ? "'" + data.Discription + "'" : defaults(data.Name).Discription
    };
};

const exam_get = async (value) => {
    return await query(`SELECT Name, number_of_questions, Discription FROM exam WHERE Name LIKE '%${value || ""}%'`);
};

const exam_question = async (Id) => {
    return await query(`SELECT * FROM exam_question WHERE exam_id= '${Id || ""}'OR question_id='${Id || ""}'`);
};

module.exports = { exam_model, exam_get, exam_question, defaults, datasql };