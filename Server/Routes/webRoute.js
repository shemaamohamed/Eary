const express = require('express');
const user_route = express();

user_route.set('view engine', 'ejs');
user_route.set('views', './views');
user_route.set(express.static('public'));

const userController = require('../Controller/userController');

user_route.get('/mail-verification', userController.verifyMail);
user_route.get('/reset-password', userController.resetpasswordload);
user_route.post('/reset-password', userController.resetpassword);



module.exports = user_route;