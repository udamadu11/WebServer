const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const {ValidCustomers,Customers} = require('../model/customer')
router.use(express.json());


router.get('/', async(req,res)=>{
    const customers = await Customers.find().sort('name');
    res.send(customers);
});


router.post('/', async (req , res) => {
    const {error} = ValidCustomers(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let customers = new Customers({ 
        name: req.body.name,
        isGold:req.body.isGold,
        phone: req.body.phone
    });
    customers = await customers.save();
    res.send(customers)
});
router.get('/:id', async (req,res)=>{
    const customers = await Customers.findById(req.params.id);
    if(!customers) return res.status(404).send('Not Found id');
    res.send(customers);
    
});


router.put('/:id', async (req,res)=>{
    const {error} = ValidCustomers(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customers = await Customers.findByIdAndUpdate(req.params.id , {name: req.body.name , isGold: req.body.isGold , phone: req.body.phone}, {new:true});
    if(!customers) return res.status(404).send("Not Found id");

    res.send(customers);

});

router.delete('/:id',async(req,res)=>{
    const customers = await Customers.findByIdAndRemove(req.params.id);
    if(!customers) return res.status(404).send('Not found Id');

    res.send(customers);

});
module.exports = router;