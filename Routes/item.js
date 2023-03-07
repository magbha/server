const express = require("express");
const { addItem, getAllItems, removeItem, getItem, updateItem } = require("../Controllers/item");
const isAuth = require("../Middlewares/isAuth");
const { addItemValidator, validation } = require("../Middlewares/Validator");
const router = express.Router();

router.post("/add-item", isAuth , addItemValidator() , validation, addItem)
router.get("/getItems/:_id" , isAuth,  getAllItems)
router.get("/:_id" , isAuth,  getItem)
router.delete("/:_id" , isAuth,  removeItem)
router.put("/:_id" , isAuth,  updateItem)


module.exports = router;
