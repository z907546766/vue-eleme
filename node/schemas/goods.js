const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const goodsSchema = new Schema({
    "_id": {
        type: ObjectId,
        ref: "seller"
    },
    goods: Array
});
module.exports = mongoose.model("goods", goodsSchema, "goods");


