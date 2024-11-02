const { default: mongoose } = require("mongoose")
const inventoryModel = require("../model/inventrySchema")

const getAnalytics = async(req,resp)=>{

    const bloodGroups = ["A-","A+","B-","B+","O-","O+","AB-","AB+"]
    const bloodAnalytics = []
    const organization = req.user.userId

     await Promise.all(bloodGroups.map(async (bloodGroup)=>{

            const totalIn = await inventoryModel.aggregate([
                {
                    $match:{
                        inventoryType:'In',
                        Organization: new mongoose.Types.ObjectId(organization),
                        bloodGroup:bloodGroup
                    }
                },
                {
                    $group:{
                        _id:null,
                        total:{$sum:"$quantity"}
                    }
                }
            ])

           const totalOut = await inventoryModel.aggregate([
            {
                $match:{

                    inventoryType:'Out',
                    Organization: new mongoose.Types.ObjectId(organization),
                    bloodGroup:bloodGroup
                }
            },
            {
                $group:{

                    _id:null,
                    total:{$sum:"$quantity"}
                }
            }

           ])

           const avaibleTotal = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)
           
           bloodAnalytics.push({
            totalIn:totalIn[0]?.total || 0,
            totalOut: totalOut[0]?.total || 0,
            avaibleTotal,
            bloodGroup
            
           })

    }))

    resp.json({result:bloodAnalytics})

}

module.exports = {getAnalytics}