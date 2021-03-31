const Joi = require('joi');
const mongoose = require('mongoose'); 

const Courses =  mongoose.model('courses',new mongoose.Schema({
    name: {
        type: String,
        require : true,
        minlength:5,
        maxlength:50
    },
}));

function ValidSchema(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(course);
}

exports.ValidSchema = ValidSchema;
exports.Courses = Courses;