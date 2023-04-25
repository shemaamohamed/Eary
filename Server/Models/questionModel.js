const { query } = require("../Global_imports/Global");

const question_model = (request, randomstring, file) => {
    return {
        "id": randomstring,
        "Name": request.body.Name,
        "Audio": file ? file.path : null,
        "RightAnswer": request.body.RightAnswer,
        "Wrong1": request.body.Wrong1,
        "Wrong2": request.body.Wrong2,
        "Wrong3": request.body.Wrong3,
        "Discription": request.body.Discription
    };
};

const question_get = async (value) => {
    try {
        return await query(`SELECT  Name, Audio, RightAnswer,Wrong1, Wrong2, Wrong3, Discription FROM questions WHERE Name LIKE '%${value || ""}%'`);
    } catch (err) {
        return false;
    }
};



const datasql = (data, question) => {
    return {
        "Name": data.NewName || data.Name,
        "Audio": data.Audio || question[0].Audio,
        "RightAnswer": data.RightAnswer || question[0].RightAnswer,
        "Wrong1": data.Wrong1 || question[0].Wrong1,
        "Wrong2": data.Wrong2 || question[0].Wrong2,
        "Wrong3": data.Wrong3 || question[0].Wrong3,
        "Discription": data.Discription || question[0].Discription
    };
};
module.exports = { question_model, question_get, datasql };