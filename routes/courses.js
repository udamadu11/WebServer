const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 

router.use(express.json());

const Courses =  mongoose.model('courses',new mongoose.Schema({
    name: {
        type: String,
        require : true,
        minlength:5,
        maxlength:50
    },
}));

router.get('/', async(req,res)=>{
    const courses = await Courses.find().sort('name');
    res.send(courses);
});


router.post('/', async (req , res) => {
    const {error} = ValidSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let course = new Courses({ name: req.body.name});
    course = await course.save();
    res.send(course)
});

router.get('/:id', async (req,res)=>{
    const course = await Courses.findById(req.params.id);
    if(!course) return res.status(404).send('Not Found id');
    res.send(course);
    
});


router.put('/:id', async (req,res)=>{
    const {error} = ValidSchema(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = await Courses.findByIdAndUpdate(req.params.id , {name: req.body.name}, {new:true});
    if(!course) return res.status(404).send("Not Found id");

    res.send(course);

});

router.delete('/:id',async(req,res)=>{
    const course = await Courses.findByIdAndRemove(req.params.id);
    if(!course) return res.status(404).send('Not found Id');

    res.send(course);

});

function ValidSchema(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(course);
}

module.exports = router;