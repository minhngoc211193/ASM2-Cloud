var express = require('express');
var router = express.Router();
var TypeModel = require('../models/TypeModel');
var ProductModel = require('../models/ProductModel');

router.get('/', async (req, res) => {
    var products = await ProductModel.find({}).populate('type');
    //Path: views/mobile/index.hbs
    res.render('product/index', {layout:'layout', products});
 })
router.get('/add', async (req, res) => {
    var types = await TypeModel.find({});
    res.render('product/add', {layout: 'layout',types});
})
router.post('/add', async (req, res) => {
    var product = req.body;
    await ProductModel.create(product);
    res.redirect('/product');
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

router.post('/search', async (req, res) => {
    var keyword = req.body.keyword;
    //SQL: SELECT * FROM mobiles WHERE model LIKE '%keyword%'
    var products = await ProductModel.find({ model: new RegExp(keyword, "i") }).populate('type');
    res.render('product/index', { products })
 })

router.get('/customer', async (req, res) =>{
    var products = await ProductModel.find({}).populate('type');
    res.render('product/customer', {layout: 'layout', products});
})
module.exports = router;