const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email : { type: String, required: true , unique : true},
  password : { type: String, required: true },
  phone :  { type: Number, required: true },
  business : { type: String, required: true },
  workAt : { type: Schema.ObjectId},
  workBranch : { type: Schema.ObjectId , ref: "branch"},
  branches : [{ type: Schema.ObjectId, ref: "branch" }],
  isAdmin : Boolean,
  alerts : [String]
});

module.exports = User = model("user", UserSchema);

