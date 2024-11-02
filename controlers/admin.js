const userModel = require("../model/userSchema")


// Get Donar List

const getDonarList = async(req,resp)=>{

    try {
        const donarList = await userModel.find({role:'User'})
        if(!donarList) throw new Error("Donar's Not Found")
        
        resp.status(200).json({result:donarList})

    } catch (error) {
        
        resp.status(400).json({result:error.message})   
    }
}


//Get Hospital List


const getHospitalList = async(req,resp)=>{

    try {
        const hospitalList = await userModel.find({role:'Hospital'})
        if(!hospitalList) throw new Error("Hospital's Not Found")
        
        resp.status(200).json({result:hospitalList})

    } catch (error) {
        
        resp.status(400).json({result:error.message})   
    }
}


//Get Organizations

const getOrganizationList = async(req,resp)=>{

    try {
        const orgList = await userModel.find({role:'Organization'})
        if(!orgList) throw new Error("Organization's Not Found")
        
        resp.status(200).json({result:orgList})

    } catch (error) {
        
        resp.status(400).json({result:error.message})   
    }
}

// ****************************************Delete Donar, Hospitals, Organizations ******************************************

//Delete Donar 

const deleteDonar = async(req,resp)=>{

    try {
        const deleteData = await userModel.findByIdAndDelete({_id:req.params.donarId})
        if(!deleteData) throw new Error('Data Not Found..')
        resp.status(200).json({result:'Data Deleted Successfully...'})

    } catch (error) {
        resp.status(400).json({result: error.message})        
    }


}

//Delete Hospital

const deleteHospital = async(req,resp)=>{

    try {
        const deleteData = await userModel.findByIdAndDelete({_id:req.params.hospitalId})
        if(!deleteData) throw new Error('Data Not Found..')
        resp.status(200).json({result:'Data Deleted Successfully...'})
    
    } catch (error) {
        resp.status(400).json({result: error.message})        
    }

}

//Delete Organization

const deleteOrg = async(req,resp)=>{

    try {
        const deleteData = await userModel.findByIdAndDelete({_id:req.params.orgId})
        if(!deleteData) throw new Error('Data Not Found..')
        resp.status(200).json({result:'Data Deleted Successfully...'})
    
    } catch (error) {
        resp.status(400).json({result: error.message})        
    }

}



module.exports = {getDonarList,getHospitalList,getOrganizationList,deleteDonar,deleteHospital,deleteOrg}