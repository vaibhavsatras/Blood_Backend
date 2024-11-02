const mongoose = require('mongoose');

const dbConnect = mongoose.connect(process.env.DB_URI)


mongoose.connection.on('connected',()=>{

        console.log('Database connceted successfully...');

})

mongoose.connection.on('error',(error)=>{

        if(error)
        {
            console.log('There is Something Error...');
        }

})


module.exports = dbConnect;