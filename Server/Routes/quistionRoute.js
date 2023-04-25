const { express } = require('../Global_imports/Global');
const router = express.Router();
const { router_template } = require('./Routing');
const { get_quistions, post_quistions, put_quistions, delete_quistions } = require('../Controllers/questionController');

router_template(router, get_quistions, post_quistions, put_quistions, delete_quistions);

module.exports = router;