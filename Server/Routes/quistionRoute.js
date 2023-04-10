const express = require("express");

const router = express.Router();

const { get_quistions, post_quistions, put_quistions, delete_quistions } = require('../Controllers/questionController.js');


router.get('/', get_quistions);

router.post('/', post_quistions);

router.put('/', put_quistions);

router.delete('/', delete_quistions);


module.exports = router;