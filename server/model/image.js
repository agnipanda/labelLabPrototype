const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ImageSchema = new Schema( {
	unique_id:Number,
	Name: String,
	image1:String,
	image2:String,
	image3:String,
	added_date:{
		type: Date,
		default: Date.now
	}
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
