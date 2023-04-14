const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

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
    (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') ? cb(null, true) : cb(null, false);
};

const uplode = multer({
    storage: storage,
    fileFilter: filefilter
});

const { signupvalidation, loginvalidation, forgetvalidation } = require('../Helpers/validation');

const userController = require('../Controllers/userController');

const { isAuthorize } = require('../middleware/auth');

//resister rout
router.post('/register', uplode.single('image'), signupvalidation, userController.register);
router.post('/login', loginvalidation, userController.login);
router.get('/get-user', isAuthorize, userController.getUser);

router.post('/forget-password', forgetvalidation, userController.forgetpassword);


module.exports = router;