const express = require('express');
const app = express();
const mongoose = require('mongoose'); 

const courses = require('./routes/courses');
const customers = require('./routes/customers');


mongoose.connect('mongodb://localhost:27017/node', {useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify :false})
    .then(()=>console.log('connect to mongodb'))
    .catch(err => console.error('Somthing wrong',err));

app.use('/api/courses',courses);
app.use('/api/customers',customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening port ${port}`));

