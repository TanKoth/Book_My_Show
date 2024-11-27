const express = require('express');
const userRoute = express.Router();
const { createUser,userLogin, getCurrentUser, forgetPassword,resetPassword } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

userRoute.post('/register', createUser);
userRoute.post('/login', userLogin);
userRoute.get("/current",auth,getCurrentUser)
userRoute.patch('/forgetpassword', forgetPassword);
userRoute.patch('/resetpassword/:email', resetPassword);


module.exports = userRoute;