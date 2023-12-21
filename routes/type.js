var express = require('express');
var router = express.Router();
var TypeModel = require('../models/TypeModel');
var ProductModel = require('../models/ProductModel');

router.get('/', async(req,res) =>{
    var types = await TypeModel.find({});
    res.render('type/index', {layout: 'layout',types});
})
router.get('/add', (req,res) => {
    res.render('type/add', {layout: 'layout'});
})

router.post('/add', async(req,res) =>{
    var type = req.body;
    await TypeModel.create(type);
    res.redirect('/type');
})

router.get('/delete/:id', async(req, res) =>{
    var id = req.params.id;
    try{
        await TypeModel.findByIdAndDelete(id);
        console.log('Delete type succeed');
    }catch(error){
        console.log('Delete faile. Error:'+ error);
    }
    res.redirect('/type');
})

router.get('deleteall', async(req,res)=>{
    await TypeModel.deleteMany();
    console.log('Delete all type succed');
    res.redirect('/type');
})

router.get('/edit/:id', async(req,res)=>{
    var id = req.params.id;
    var type = await TypeModel.findById(id);
    res.render('type/edit', {layout: 'layout',type});
})

router.post('/edit/:id', async(req,res)=>{
    var id = req.params.id;
    var type = req.body;
    try {
        await TypeModel.findByIdAndUpdate(id, type);
        console.log('Update type succeed');
    } catch (error) {
        console.log('Update faile. Error: ' + error);
    }
    res.redirect('/type');
})
router.get('/detail/:id',async (req, res) => {
    var id = req.params.id;
    //SQL: SELECT * FROM mobiles WHERE brand = "id"
    var types = await TypeModel.findById(id);
    res.render('type/detail', { types })
 
})

module.exports = router;