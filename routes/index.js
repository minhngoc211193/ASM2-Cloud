var express = require('express');
var router = express.Router();
//ar TypeModel = require('../models/TypeModel');
var ProductModel = require('../models/ProductModel');

/* GET home page. */
router.get('/', async(req, res)=> {
  var products = await ProductModel.find({}).populate('type');
  res.render('index', {products});
});

module.exports = router;
