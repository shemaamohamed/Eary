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
const datasql = (data, exam) => {
    return {
        "Name": data.NewName || data.Name,
        "number_of_questions": exam[0].number_of_questions,
        "Discription": data.Discription || exam[0].Discription
    };
};

const exam_get = async (value) => {
    try {
        return await query(`SELECT Name, number_of_questions, Discription FROM exam WHERE Name LIKE '%${value || ""}%'`);
    } catch (err) {
        // console.log("exam_get \n");
        // console.log(err);
        return false;
    }
};

const exam_question = async (Id) => {
    try {
        return await query(`SELECT * FROM exam_question WHERE exam_id= '${Id || ""}'OR question_id='${Id || ""}'`);
    } catch (err) {
        // console.log("exam_question \n");
        // console.log(err);
        return false;
    }
};

module.exports = { exam_model, exam_get, exam_question, datasql };