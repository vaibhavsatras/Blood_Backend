const express = require('express');
const { getDonarList, getHospitalList,getOrganizationList, deleteDonar, deleteHospital, deleteOrg } = require('../controlers/admin');
const userAuth = require('../middleware/userMiddleware');
const router = express.Router();

router.get('/getdonarList',userAuth,getDonarList)
router.get('/gethospitalList',userAuth,getHospitalList)
router.get('/getorganizationList',userAuth,getOrganizationList)

router.delete('/deleteDonar/:donarId',userAuth,deleteDonar)
router.delete('/deleteHospital/:hospitalId',userAuth,deleteHospital)
router.delete('/deleteOrg/:orgId',userAuth,deleteOrg)

module.exports = router