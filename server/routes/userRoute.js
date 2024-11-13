const express = require('express');
const userRoute = express.Router();
const { createUser,userLogin } = require('../controllers/userController');

userRoute.post('/register', createUser);
userRoute.post('/login', userLogin);

module.exports = userRoute;