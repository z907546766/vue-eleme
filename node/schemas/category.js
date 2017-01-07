const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;
const categorySchema = new Schema({
	category:[{
		url:String,
		caption:String
	}]
});
module.exports = mongoose.model("category", categorySchema, "category");
