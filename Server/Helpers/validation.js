const {check} = require('express-validator');

exports.signupvalidation = [
    check('name', 'name is required').not().isEmpty,
    check('email', 'please enter a vaild email').isEmail().normalizeEmail({gmail_remove_dot : true}),
    check('password', 'password is required').isLength({min : 8}),
    check('image').custom((value, {req}) => {
        if (req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png') {
            return true;
        } else {
            return false;
        }
    }).withMessage('you must upload an image type png or jpg ')
]

exports.loginvalidation = [
    check('email', 'please enter a vaild email').isEmail().normalizeEmail({gmail_remove_dot: true}),
    check('password', 'password is required min 6 length').isLength({min : 8})
]

exports.forgetvalidation = [
    check('email', 'please enter a vaild email').isEmail().normalizeEmail({gmail_remove_dot: true})
]
