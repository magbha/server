const express = require("express");
const { addBranch, getAllBranch, removeBranch, updateBranch, getBranch } = require("../Controllers/branch");
const isAuth = require("../Middlewares/isAuth");
const Branch = require("../Models/Branch");
const router = express.Router();

router.post("/newBranch", addBranch)
router.get("/allBranches/:_id", isAuth ,getAllBranch)
router.delete("/:_id", isAuth , removeBranch)
router.put("/:_id", updateBranch)
router.get("/getOne/:_id", getBranch)

module.exports = router;

