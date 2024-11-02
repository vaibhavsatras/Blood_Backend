const express = require('express');
const { getAnalytics } = require('../controlers/analytics');
const userAuth = require('../middleware/userMiddleware');
const router = express.Router();


router.post('/analytics',userAuth,getAnalytics);

module.exports = router