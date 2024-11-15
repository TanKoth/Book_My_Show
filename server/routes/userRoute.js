const express = require('express');
const userRoute = express.Router();
const { createUser,userLogin, getCurrentUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

userRoute.post('/register', createUser);
userRoute.post('/login', userLogin);
userRoute.get("/current",auth,getCurrentUser)


module.exports = userRoute;