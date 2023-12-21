var mongoose = require('mongoose');
var CountrySchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: [3, 'type name must be at least 3 characters'],
         maxlength: 20
      }
   });
var CountryModel = mongoose.model('countries', CountrySchema);
module.exports = CountryModel;