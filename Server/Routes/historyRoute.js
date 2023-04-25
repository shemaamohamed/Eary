const { express } = require('../Global_imports/Global');
const router = express.Router();
const { router_template } = require('./Routing');
const { get_history, post_history, put_history, delete_history } = require("../Controllers/historyController");

router_template(router, get_history, post_history, put_history, delete_history);

module.exports = router;