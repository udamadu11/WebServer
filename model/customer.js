const Joi = require('joi');
const mongoose = require('mongoose'); 

const Customers =  mongoose.model('customers',new mongoose.Schema({
    name: {
        type: String,
        require : true,
        minlength:5,
        maxlength:50
    },
    isGold:{
        type: Boolean,
        require: true
    },
    phone:{
        type: String,
        require : true,
        minlength:5,
        maxlength:50
    }
}));

function ValidCustomers(customers){
    const schema = Joi.object({
        name : Joi.string().min(5).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    });
    return schema.validate(customers);
}

exports.ValidCustomers = ValidCustomers;
exports.Customers = Customers;