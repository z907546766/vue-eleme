const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ratingsSechema = new Schema({
    "_id": {
        type: Schema.Types.ObjectId,
        ref: "seller"
    },
    ratings: Array
});
module.exports = mongoose.model("ratings", ratingsSechema, "ratings")
