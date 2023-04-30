const { query } = require("../Global_imports/Global");

const exam_post_model = (request, randomstring) => {
    return {
        "id": randomstring,
        "Name": request.body.Name,
        "Discription": request.body.Discription,
        "questions": Array.isArray(request.body.questions) ? request.body.questions : [request.body.questions]
    };
};
const exam_put_model = async (data, exam) => {
    return {
        "Name": data.NewName || data.Name,
        "number_of_questions": exam[0].number_of_questions,
        "Discription": data.Discription || exam[0].Discription
    };
};

const exam_get_search = async (value) => {
    try {
        return await query(`SELECT Name, number_of_questions, Discription FROM exam WHERE Name LIKE '%${value || ""}%'`);
    } catch (err) {
        // console.log("exam_get_search \n");
        // console.log(err);
        return false;
    }
};

const exam_get = async (value) => {
    try {
        return await query(`SELECT Name, number_of_questions, Discription FROM exam WHERE Name = '${value}'`);
    } catch (err) {
        // console.log("exam_get \n");
        // console.log(err);
        return false;
    }
};

module.exports = { exam_post_model, exam_get_search, exam_get, exam_put_model };