var express = require('express');
var router = express.Router();
//var TypeModel = require('../models/TypeModel');
var ProductModel = require('../models/ProductModel');

router.get('/', async (req, res) => {
    var products = await ProductModel.find({}).populate('type');
    //Path: views/mobile/index.hbs
    res.render('product/index', { products });
 })


module.exports = router;