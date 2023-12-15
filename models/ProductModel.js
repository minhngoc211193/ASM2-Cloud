var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: [3, 'type name must be at least 3 characters'],
         maxlength: 20
      },
      price:{
        type: String,
        required: true,
      },
      image:String,
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'types'  // 'types': collectionm
     }
   });
var ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;