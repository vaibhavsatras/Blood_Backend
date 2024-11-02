const express = require('express');
const { usersignup, userSignIn, currentUser } = require('../controlers/userRegister');
const userAuth = require('../middleware/userMiddleware');
const router = express.Router();


router.post('/signUp',usersignup);
router.post('/signIn',userSignIn);
router.get('/currentUser',userAuth,currentUser);

module.exports = router