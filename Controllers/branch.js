const Branch = require("../Models/Branch");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");



exports.addBranch = async (req , res) => {
    try {
        const {branchName , branchAddress , branchBusiness , branchPhoneNumber ,branchEmail} = req.body;
        const newBranch = await new Branch({ branchName , branchAddress ,branchBusiness , branchPhoneNumber ,branchEmail });
        newBranch.save();
        await User.updateOne( { "_id" : branchBusiness },{ $set: { "workAt": branchBusiness } });
        await User.updateOne( { "_id" : branchBusiness },{ $push: { "branches": newBranch } });
        res.status(200).send({ user: newBranch });
      } catch (error) {
        res.status(400).send({ err: error.response });
      }
}

exports.getAllBranch = async(req , res) => {
  try {
      const {_id} = req.params  
      const allBranches = await Branch.find({branchBusiness : _id})
      res.status(200).send({msg : "branches" , allBranches})
  } catch (error) {
      res.status(400).send({msg : "Cant get Branches" , error})
  }
}

exports.removeBranch = async(req , res) => {
  try {
    const user = req.user
  
    const {_id} = req.params;
    await Branch.findOneAndDelete({_id})
    const resault = await User.updateOne( { "_id" : user._id },{ $pull: { "branches": _id } });
    res.status(200).send({msg : "Branch Deleted"})
} catch (error) {
    res.status(400).send({msg : "Cannot Delete Branch" , err : error.message})
}
}

exports.getBranch = async(req , res) => {
  try {
    const {_id} = req.params;
    const iBranch =  await Branch.findById({_id})
    res.status(200).send({msg : "This Branch" , iBranch})        
} catch (error) {
    res.status(400).send({msg : "cannot find branch" , error })
}
}

exports.updateBranch = async(req , res) => {
  try {
    const {_id} = req.params;
    const resault = await Branch.findByIdAndUpdate({_id} , {$set : {...req.body}})
    res.status(200).send({msg : "Branch Updated!" })
} catch (error) {
    res.status(400).send({msg : "Cannot Update" , error})
}
}