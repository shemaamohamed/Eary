const { query } = require("../Global_imports/Global");

// {
//     "exam":data.exam_Name,
//     "created_at":new Date()
//     "questions_answers":[{
//         "question":,
//         "answer"  :
//     },{
//         "question":,
//         "answer"  :
//     },...],
// }

const history_post_model = (questions_answers, user, exam_question, creation_date) => {
    let arr3 = [];
    for (let i = 0; i < exam_question.length; i++) {
        arr3.push(exam_question[i].question_Name);
    }
    questions_answers.sort((a, b) => {
        return arr3.indexOf(a.question) - arr3.indexOf(b.question);
    });
    let arr = [];
    for (let i = 0; i < exam_question.length; i++) {
        arr.push({
            "user_id": user.id,
            "exam_id": exam_question[0].exam_id,
            "question_id": exam_question[i].question_id,
            "Answer": questions_answers[i].answer,
            "IsRight": questions_answers[i].answer === exam_question[i].RightAnswer,
            "created_at": creation_date
        });
    }
    return arr;
};

const get_score = async (user_id, exam_id, creation_date) => {
    try {
        const score = await query(`SELECT COUNT(*) FROM history WHERE user_id=${user_id} AND exam_id='${exam_id}' AND IsRight=1 AND created_at='${creation_date}' ;`);
        return score[0]["COUNT(*)"];
    } catch (err) {
        return null;
    }
};
module.exports = { history_post_model, get_score };