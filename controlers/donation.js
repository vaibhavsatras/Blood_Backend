const inventoryModel = require("../model/inventrySchema")

const donations = async (req,resp)=>{
    
    const getDonations = await inventoryModel.find({inventoryType:'In',User:req.user.userId}).populate('User')
    resp.json({result:getDonations})

}


const consumers = async(req,resp)=>{
    
    const getConsumers = await inventoryModel.find({inventoryType:'Out',Hospital:req.user.userId}).populate('Hospital')
    resp.json({result:getConsumers})

}


module.exports = {donations,consumers}