const { router, router_template } = require('./Routing');

const { get_exams, post_exams, put_exams, delete_exams } = require("../Controllers/examController");

router_template(get_exams, post_exams, put_exams, delete_exams);

module.exports = router;