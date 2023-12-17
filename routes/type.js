var express = require('express');
var router = express.Router();
var TypeModel = require('../models/TypeModel');
var ProductModel = require('../models/ProductModel');

router.get('/type', async(req,res) =>{
    var types = await TypeModel.find({});
    res.render('type/index', {types});
})
router.get('/add', (req,res) => {
    res.render('type/add');
})

router.post('/add', async(req,res) =>{
    var type = req.body;
    await TypeModel.create(type);
    res.redirect('/type');
})
router.get('/detail/:id', async (req, res) => {
    var id = req.params.id;
    //SQL: SELECT * FROM mobiles WHERE brand = "id"
    var products = await ProductModel.find({ type : id }).populate('type');
    res.render('type/detail', { products })
 })
router.get('./delete/:id', async(req, res) =>{
    var id = req.params.id;
    try{
    await TypeModel.findByIdAndDelete(id);
    console.log('Delete type succeed');
    }catch(err){
        console.log('Delete type fail. Error:' +err)};
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
    res.render('type/edit', {type});
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

module.exports = router;