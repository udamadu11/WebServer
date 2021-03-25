const Joi = require('joi');
const express = require('express');
const app = express();

const courses = [
    {id:1 , name: 'Maths'},
    {id:2 , name: 'Sinhala'},
    {id:3 , name: 'Science'},
    {id:4 , name: 'History'}
];

app.use(express.json());

app.get('/',(req,res) => {
    res.send("hello world");
});

app.get('/api/courses/',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses/', (req , res) => {
    
    const {error} = ValidSchema(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
});

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Not Found id');
    res.send(course);
    
});

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Not Found id");

    const {error} = ValidSchema(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }

     course.name = req.params.name;
     res.send(course);

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening port ${port}`));

function ValidSchema(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(course);
}