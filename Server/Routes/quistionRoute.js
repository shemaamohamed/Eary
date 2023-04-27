const { express } = require('../Global_imports/Global');
const router = express.Router();
const { router_template } = require('./Routing');
const { get_questions, post_questions, put_questions, delete_questions } = require('../Controllers/questionController');

router_template(router, get_questions, post_questions, put_questions, delete_questions);

module.exports = router;