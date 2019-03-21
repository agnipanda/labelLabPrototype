const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema( {
	label:String,
	images:[String]
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
