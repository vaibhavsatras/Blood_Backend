const mongoose = require('mongoose');
const {createHmac,randomBytes} = require('crypto');
const { Authorization } = require('../Auth/auth');

const userSchema = new mongoose.Schema({

    role:{

        type: String,
        required: true,
        enum:['User','Admin','Hospital','Organization']

    },

    name:{
        type: String,
        required: function(){
            if(this.role === 'User' || this.role === 'Admin')
            {
                return true
            }
            return false
        }
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },

    hospitalName:{
        type: String,
        required: function (){

                if(this.role === 'Hospital')
                {
                    return true
                }
                else
                {
                    return false
                }

        }
    },

    orgnaztionName:{
        type: String,
        required: function (){

                if(this.role === 'Organization')
                {
                    return true
                }
                else
                {
                    return false
                }

        }
    },

    website:{
        type: String
    },
    salt:{
        type: String
    }

},{timestamps: true})


userSchema.pre('save',function(next){

    const user = this;
    
    try {

        if(!user) throw new Error('User Not Found..');

        const salt = randomBytes(16).toString('hex');

        const hashPassword = createHmac('sha256',salt).update(user.password).digest('hex');

        this.salt = salt;
        this.password = hashPassword;

        next();
        
    } catch (error) {

        console.log(error.message);
        
    }

})


//User Sign In

userSchema.static('mathPassword', async function(email,password,role){

    const user = await this.findOne({email:email})

    try {

        if(!user) throw new Error('User Does not Exists...');

        const salt = user.salt;
        const oldpassword = user.password;
        const userRole = user.role

        const newHashPassword = createHmac('sha256',salt).update(password).digest('hex');

        if(userRole !== role) throw new Error('User Role Not Match..');

        if(newHashPassword !== oldpassword) throw new Error('Password not Match');

       const token = Authorization(user);

       return token
        
    } catch (error) {

        console.log(error.message)
        
    }

})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel