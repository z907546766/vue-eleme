const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const sellerSchema = new Schema({
    _id: {
        type: ObjectId,
        ref: "category"
    },
    sellers: [{
        "name": String,
        "description": String,
        "deliveryTime": Number,
        "score": Number,
        "serviceScore": Number,
        "foodScore": Number,
        "rankRate": Number,
        "minPrice": Number,
        "deliveryPrice": Number,
        "ratingCount": Number,
        "sellCount": Number,
        "collected": {
            type: Boolean,
            default: true
        },
        "bulletin": String,
        "supports": Array,
        "avatar": String,
        "pics": Array,
        "infos": Array
    }]
});
// userSchema.pre("save", (next)=>{
//   let salt = bcrypt.genSaltSync(10);
//   let hash = bcrypt.hashSync(this.password, salt);
//   this.password = hash;
//   next();
// })
module.exports = mongoose.model("seller", sellerSchema, "seller");
