
const jwt = require('jsonwebtoken');
const SEC_KEY = process.env.SEC_KEY;

const Authorization = (user)=>{

    const token = jwt.sign({
        userId: user._id,
        email:user.email,
        role: user.role
    },SEC_KEY);

    try {
        
        if(!token) throw new Error('Token Not Found..');
        
        return token

    } catch (error) {

        console.log1(error.message);
        
    }

}

const Authintication = (token)=>{

        const user = jwt.verify(token,SEC_KEY);
        return user

}

module.exports = {Authorization,Authintication}