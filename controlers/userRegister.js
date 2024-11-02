const userModel = require("../model/userSchema");

const usersignup = async(req,resp)=>{

    const{name,email,address,password,hospitalName,orgnaztionName,website,phone,role} = req.body;

    const mail = await userModel.findOne({email:email});

    try {

        if(mail) throw new Error('Email Address Already Exists..');
        
        const newUser = new userModel({
            role,
            name,
            email,
            address,
            password,
            hospitalName,
            orgnaztionName,
            website,
            phone
        })
        const newData  = await newUser.save();

        resp.status(200).json({result:"User Registered Successfully..."});

    } catch (error) {

        resp.json({error:error.message});
        
    }

}


//User Sign In

const userSignIn = async(req,resp)=>{

    const{email,password,role} = req.body;

    try {

        const userMatch = await userModel.mathPassword(email,password,role);
        
        if(!userMatch) throw new Error('Password is missMatch')

        resp.json({result: userMatch,user:{email,password,role}})
        
    } catch (error) {

        resp.json({error:error.message});
        
    }

}

//Get Current User

const currentUser = async(req,resp)=>{

    const currentData = await userModel.findOne({_id:req.user.userId})

    try {
        
        if(!currentData) throw new Error('user does not Found...');

        resp.json({result:currentData});

    } catch (error) {

        resp.json({error:error.message});
        
    }

}


module.exports = {usersignup,userSignIn,currentUser};