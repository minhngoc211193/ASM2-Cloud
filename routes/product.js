var express = require('express');
var router = express.Router();
var TypeModel = require('../models/TypeModel');
var ProductModel = require('../models/ProductModel');
var CountryModel = require('../models/CountryModel');

router.get('/', async (req, res) => {
    var products = await ProductModel.find({}).populate('type');
    //Path: views/mobile/index.hbs
    res.render('product/index', {layout:'layout', products});
 })
router.get('/add', async (req, res) => {
    var types = await TypeModel.find({});
    //var product = await ProductModel.find({}).populate('country');
    var countries = await CountryModel.find({});
    res.render('product/add', {layout: 'layout',types, countries});
})
router.post('/add', async (req, res) => {
    var product = req.body;
    await ProductModel.create(product);
    res.redirect('/product');
})
router.get('/detail/:id',async (req, res) => {
    var id = req.params.id;
    //SQL: SELECT * FROM mobiles WHERE brand = "id"
    var products = await ProductModel.findById(id);
    res.render('product/detail', { products })
 
})
router.get('/sort/asc', async (req, res) => {
    var products = await ProductModel.find().populate('type').sort({ price: 1 });
    res.render('product/index', { products })
 })
 
 router.get('/sort/desc', async (req, res) => {
    var products = await MobileModel.find().populate('type').sort({ price: -1 });
    res.render('product/index', { products })
 })

router.get('/delete/:id', async (req, res) => {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.redirect('/product');
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var product = await ProductModel.findById(id);
    var types = await TypeModel.find({});
    res.render('product/edit', {layout: 'layout',product, types});
})
router.post('/edit/:id', async(req, res) =>{
    var id = req.params.id;
    var product = req.body;
    try {
        await ProductModel.findByIdAndUpdate(id, product);
        console.log('Update product succeed');
    } catch (err) {
        console.log('Update faile. Error:'+ err);
    }
    res.redirect('/product');
})

router.post('/search/', async (req, res) => {
    var keyword = req.body.name;
    //SQL: SELECT * FROM mobiles WHERE model LIKE '%keyword%'
    var products = await ProductModel.find({ name: new RegExp(keyword, "i") }).populate('type');
    res.render('product/index', { products: products })
 })

router.get('/customer', async (req, res) =>{
    var products = await ProductModel.find({}).populate('type');
    res.render('product/customer', { products});
})
module.exports = router;