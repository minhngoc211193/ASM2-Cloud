var mongoose = require('mongoose');
var TypeSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: [3, 'type name must be at least 3 characters'],
         maxlength: 20
      },
      image:String
   });
var TypeModel = mongoose.model('types', TypeSchema);
module.exports = TypeModel;