const { check } = require('express-validator');

const signupvalidation = [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please enter a vaild email').isEmail().normalizeEmail({ gmail_remove_dot: true }),
    check('password', 'password is required').isLength({ min: 8 }),
    // check('image').custom((_value, { req }) => {
    //     console.log(req);
    //     if (req.file.mimetype == 'image/jpeg' || 'image/png') {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }).withMessage('you must upload an image type png or jpg ')
];

const loginvalidation = [
    check('email', 'please enter a vaild email').isEmail().normalizeEmail({ gmail_remove_dot: true }),
    check('password', 'password is required min 6 length').isLength({ min: 8 })
];

const forgetvalidation = [
    check('email', 'please enter a vaild email').isEmail().normalizeEmail({ gmail_remove_dot: true })
];

module.exports = { signupvalidation, loginvalidation, forgetvalidation };