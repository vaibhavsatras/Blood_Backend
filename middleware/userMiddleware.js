const { Authintication } = require("../Auth/auth");


const userAuth = (req,resp,next)=>{

        const token = req.headers['authorization'];

        try {
            
            if(!token) throw new Error('Token Not Found...');

            const getUser =  Authintication(token);

            if(!getUser) throw new Error('Invalid User...');

            req.user = getUser;

            next();

        } catch (error) {

            resp.json({error:error.message});
            
        }

}

module.exports = userAuth;