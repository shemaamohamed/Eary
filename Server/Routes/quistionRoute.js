const { router, router_template } = require('./Routing');
const { get_quistions, post_quistions, put_quistions, delete_quistions } = require('../Controllers/questionController');

router_template(get_quistions, post_quistions, put_quistions, delete_quistions);


module.exports = router;