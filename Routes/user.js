const express = require("express");
const isAuth = require("../Middlewares/isAuth");
const { register, login, getAllUsers, removeAlerts } = require("../Controllers/user");
const { registerValidator, loginValidator, validation } = require("../Middlewares/Validator");

const router = express.Router();


router.post("/register", registerValidator() , validation, register);

router.post("/login", loginValidator() ,validation ,login);


router.put("/removeAlerts",  isAuth ,removeAlerts);

router.get("/all-users" , isAuth ,getAllUsers);

router.get("/current-user", isAuth, (req, res) => {
  const currentUser = req.user;
  res.send({ currentUser });
});


module.exports = router;
