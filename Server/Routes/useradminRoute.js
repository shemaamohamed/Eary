const express = require('express');
const router = express.Router();

const { router_template } = require('./Routing');

const { get_user, post_user, put_user, delete_user } = require('../Controllers/useradminController');

router_template(router, get_user, post_user, put_user, delete_user);

module.exports = router;