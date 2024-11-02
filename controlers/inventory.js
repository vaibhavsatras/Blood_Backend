const { default: mongoose } = require("mongoose")
const inventoryModel = require("../model/inventrySchema")
const userModel = require("../model/userSchema")

const createInventory = async (req,resp)=>{

    const {inventoryType,bloodGroup,quantity,userMail,Organization} = req.body

    try {

        // if(inventoryType === 'In' && req.user.role !== 'User') throw new Error('User not athorized to  Donate')
        // if(inventoryType === 'Out' && req.user.role !== 'Hospital') throw new Error('User Not Authorizated to dispatch Blood')

        const getHospital = await userModel.findOne({role:'Hospital'})
        const userId = await userModel.findOne({email:userMail})


        const getOrg = await userModel.findOne({role:'Organization'})

        if(inventoryType === 'Out')
        {

            const requestedBloodGroup = bloodGroup
            const requestedQuantity = quantity
            const organization = getOrg._id

        if(getHospital.email !== userMail) throw new Error('Email Not registered')

            const requestedInBloodTotal = await inventoryModel.aggregate([

                {
                    $match:{
                        Organization: new mongoose.Types.ObjectId(organization),
                        inventoryType : "In",
                        bloodGroup: requestedBloodGroup
                    }},
                    {
                    $group:{
                        _id: "$bloodGroup",
                        total:{$sum:"$quantity"}
                    }
                }

            ])


            const totalIn = requestedInBloodTotal[0]?.total || 0
            
           
            const requestedOutBloodTotal = await inventoryModel.aggregate([
                {
                    $match:{
                        Organization: new mongoose.Types.ObjectId(organization),
                        inventoryType: "Out",
                        bloodGroup: requestedBloodGroup,
                    }
                },
                {
                    $group:{
                        _id: '$bloodGroup',
                        total:{$sum:'$quantity'}
                    }
                }
            ])



           const totalOut = requestedOutBloodTotal[0]?.total || 0


           const availableQty = totalIn - totalOut

           if(availableQty < requestedQuantity) throw new Error (`The ${requestedBloodGroup} is avialble only ${availableQty}`)

        } 
        
        else
        
        if(inventoryType === 'In')
        {
            
        const mail = await userModel.findOne({email:userMail})
        if(!mail) throw new Error("Email Address Not registered")
 
        }

        const newInventory = new inventoryModel({
            inventoryType,
            bloodGroup,
            quantity,
            userMail,
            User: userId._id,
            Organization:getOrg._id,
            Hospital: getHospital._id
        })
        
        await newInventory.save();

        resp.json({result:"Data Created Successfully.."});

    } catch (error) {

        console.log(error.message)
        resp.json({error:error.message})
        
    }

}


//Get Inventory

const getInventory = async (req,resp)=>{

    const getData = await inventoryModel.find({})

    return resp.status(200).json({result:getData})


}

//Get Donar

const getDonar = async (req,resp)=>{

    const getDonarData = await inventoryModel.find({inventoryType: 'In'}).populate('User')

    resp.json({result:getDonarData})

}


//Get Hospitals

const getHospital = async(req,resp)=>{

    const getHospitalData = await inventoryModel.find({inventoryType:'Out'}).populate('Hospital')
    resp.json({result:getHospitalData})

}

//Get Organizations

const getOrganizations = async(req,resp)=>{

    const getOrgData = await userModel.find({role:'Organization'})

    resp.json({result:getOrgData})

}


module.exports = {createInventory,getInventory,getDonar,getHospital,getOrganizations}