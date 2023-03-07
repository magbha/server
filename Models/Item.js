const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
  itemName: { type: String, required: true },
  manufacture : { type: String, required: true },
  createdBy : { type: Schema.ObjectId , ref: "user"},
  itemBranch : { type: Schema.ObjectId , ref: "branch"},
  aboutItem : { type: String, required: true },
  itemPrice: { type: Number, required: true },
  qty : { type: Number},
  itemType : { type: String},
  addDate : String,
  itemBusiness : { type: Schema.ObjectId , ref: "user"}
});


module.exports = Item = model("item" , ItemSchema);
