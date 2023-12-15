var mongoose = require('mongoose');
var TypeSchema = mongoose.Schema(
   {
      type: {
         type: String,
         required: true,
         minlength: [3, 'type name must be at least 3 characters'],
         maxlength: 20
      }
   });
var TypeModel = mongoose.model('types', TypeSchema);
module.exports = TypeModel;