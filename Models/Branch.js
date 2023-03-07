const mongoose = require("mongoose");
const {Schema , model} = mongoose;
const User = require("./User");

const branchSchema = new Schema ({
    branchName : {type : String, required : true},
    branchAddress : {type : String},
    branchBusiness : { type: Schema.ObjectId, ref: "user" },  
    branchPhoneNumber : {type : Number},
    branchEmail : {type : String}

})

module.exports = Branch = model("branch" , branchSchema);