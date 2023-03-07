const { check, validationResult } = require("express-validator");

exports.registerValidator = () => [
  check("firstName", "Please Enter Your First Name").not().isEmpty(),
  check("lastName", "Please Enter Your Last Name").notEmpty(),
  check("email", "Please Enter a Valid Email").notEmpty().isEmail(),
  check("password", "Please Enter a Valid Password").notEmpty().isLength({ min: 8 }),
  check("phone", "Please Enter Your Phone Number").notEmpty(),
  check("business", "Please Enter Your Business Name").notEmpty(),
];

exports.loginValidator = () => [
  check("email", "Please Enter a Valid Email").notEmpty().isEmail(),
  check("password", "Please Enter a Valid Password").notEmpty().isLength({ min: 8 }),
];

exports.addItemValidator = () => [
  check("itemName", "Please Enter An item Name").not().isEmpty(),
  check("manufacture", "Please Enter item Manufacture").notEmpty(),
  check("aboutItem", "Please Enter a item Information").notEmpty(),
  check("itemPrice", "Please Enter item Price").notEmpty(),
  check("qty", "Please Enter item Quantity").notEmpty(),
  check("itemType", "Please Enter item Type").notEmpty(),
]


exports.validation = (req , res , next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({msg : errors.array()}) 
    } next()
}
