const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const { admin, authorized } = require('../middleware/authorizations');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const filefilter = (req, file, cb) => {
    (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/x-png') ? cb(null, true) : cb(null, false);
};

const uplode = multer({
    storage: storage,
    fileFilter: filefilter
});

const { signupvalidation, loginvalidation, forgetvalidation } = require('../helpers/validation');

const usercontroller = require('../Controllers/userController');

const { isAuthorize } = require('../middleware/auth');

//resister rout
router.post('/register', uplode.single('image'), signupvalidation, usercontroller.register);
router.post('/login', loginvalidation, usercontroller.login);
router.get('/get-user', authorized, usercontroller.getUser);
router.post('/forget-password', forgetvalidation, usercontroller.forgetpassword);
router.post('/user_put', authorized, usercontroller.user_put);


module.exports = router;