const express = require('express');
const {donations,consumers} = require('../controlers/donation');
const userAuth = require('../middleware/userMiddleware');
const router = express.Router();


router.post('/donation',userAuth,donations)
router.post('/consumer',userAuth,consumers)

module.exports = router