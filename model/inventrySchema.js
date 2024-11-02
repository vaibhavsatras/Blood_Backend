
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({

    inventoryType:{
        type: String,
        required: true,
        enum:["In","Out"]
    },
    userMail:{
        type: String,
        required: true
    },
    bloodGroup:{
        type: String,
        required: true,
        enum:["A-","A+","B-","B+","O-","O+","AB-","AB+"]
    },
    quantity:{
        type: Number,
        required: true
    },

    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function(){
            if(this.inventoryType === 'In')
            {
                return true
            }
            return false
        }
    },
    Hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: function(){
            if(this.inventoryType === 'Out')
            {
                return true
            }
            else
            {
                return false
            }
        }
    },

    Organization:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
        
    }

},{timestamps:true})

const inventoryModel = mongoose.model('inventories',inventorySchema);

module.exports = inventoryModel;