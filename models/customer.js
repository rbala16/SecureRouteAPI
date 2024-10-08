const mongoose = require("mongoose");
const validator = require("validator");

const Customer = mongoose.model("Customer",{
    custId:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number");
            }
        },
    },
    location: {
        type: String,
        required: true,
        trim: true,
      },

});

module.exports = Customer;
