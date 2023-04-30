const { query } = require("../Global_imports/Global");

const exam_post_model = (request, randomstring) => {
    return {
        "id": randomstring,
        "Name": request.body.Name,
        "Description": request.body.Description,
        "questions": Array.isArray(request.body.questions) ? request.body.questions : [request.body.questions]
    };
};
const exam_put_model = async (data, exam) => {
    return {
        "Name": data.NewName || data.Name,
        "number_of_questions": exam[0].number_of_questions,
        "Description": data.Description || exam[0].Description
    };
};

const exam_get_search = async (value) => {
    try {
        return await query(`SELECT Name, number_of_questions, Description FROM exam WHERE Name LIKE '%${value || ""}%'`);
    } catch (err) {
        // console.log("exam_get_search \n");
        // console.log(err);
        return false;
    }
};

const exam_get = async (value) => {
    try {
        return await query(`SELECT Name, number_of_questions, Description FROM exam WHERE Name = '${value}'`);
    } catch (err) {
        // console.log("exam_get \n");
        // console.log(err);
        return false;
    }
};

module.exports = { exam_post_model, exam_get_search, exam_get, exam_put_model };