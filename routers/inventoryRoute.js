const express = require('express');
const { createInventory, getInventory, getDonar, getHospital, getOrganizations} = require('../controlers/inventory');
const userAuth = require('../middleware/userMiddleware');
const router = express.Router();

router.post('/createInventory',userAuth,createInventory);
router.get('/getInventory',userAuth,getInventory);
router.get('/getDonar',userAuth,getDonar);
router.get('/getHospital',userAuth,getHospital);
router.get('/getOrganization',userAuth,getOrganizations);

module.exports = router