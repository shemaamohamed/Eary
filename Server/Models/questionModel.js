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
    return await query(`SELECT  Name, Audio, RightAnswer,Wrong1, Wrong2, Wrong3, Discription FROM questions WHERE Name LIKE '%${value || ""}%'`);
};

const defaults = (Name) => {
    currentname = "'" + Name + "'" + ")";
    return {
        "Name": "(SELECT Name FROM questions WHERE Name=" + currentname,
        "Audio": "(SELECT Audio FROM questions WHERE Name=" + currentname,
        "RightAnswer": "(SELECT RightAnswer FROM questions WHERE Name=" + currentname,
        "Wrong1": "(SELECT Wrong1 FROM questions WHERE Name=" + currentname,
        "Wrong2": "(SELECT Wrong2 FROM questions WHERE Name=" + currentname,
        "Wrong3": "(SELECT Wrong3 FROM questions WHERE Name=" + currentname,
        "Discription": "(SELECT Discription FROM questions WHERE Name=" + currentname
    };
};

const datasql = (data, file, pathsql) => {
    return {
        "Name": data.Newname ? "'" + data.Newname + "'" : defaults(data.Name).Name,
        "Audio": file ? "'" + pathsql + "'" : defaults(data.Name).Audio,
        "RightAnswer": data.RightAnswer ? "'" + data.RightAnswer + "'" : defaults(data.Name).RightAnswer,
        "Wrong1": data.Wrong1 ? "'" + data.Wrong1 + "'" : defaults(data.Name).Wrong1,
        "Wrong2": data.Wrong2 ? "'" + data.Wrong2 + "'" : defaults(data.Name).Wrong2,
        "Wrong3": data.Wrong3 ? "'" + data.Wrong3 + "'" : defaults(data.Name).Wrong3,
        "Discription": data.Discription ? "'" + data.Discription + "'" : defaults(data.Name).Discription
    };
};
module.exports = { question_model, question_get, defaults, datasql };