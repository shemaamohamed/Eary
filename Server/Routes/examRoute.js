const { express } = require('../Global_imports/Global');
const router = express.Router();
const { router_template } = require('./Routing');
const { get_exams, post_exams, put_exams, delete_exams } = require("../Controllers/examController");

router_template(router, get_exams, post_exams, put_exams, delete_exams);

module.exports = router;