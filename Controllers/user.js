const User = require("../Models/User")
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { firstName , lastName, email, password, phone , business ,workAt ,workBranch , isAdmin} = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send({ msg: "Email Already Exist !! " } );
    }

    const saltRounds = 10;
    const hachedPassword = await bcypt.hash(password, saltRounds);

    const newUser = new User({ firstName , lastName, email, password: hachedPassword , phone , business ,workAt , workBranch , isAdmin});
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SCRT_KEY, {expiresIn: "24h",});
    res.status(200).send({ msg: "Register Done "   , user : newUser , token });
  } catch (error) {
    res.status(400).send({msg : "Cannot Register ", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //
    const userInfo = await User.findOne({ email });
    if (!userInfo) { return res.status(400).send({ msg: "no User found"  })}
    //
    const checkedPassword = await bcypt.compare(password, userInfo.password);
    if (!checkedPassword) {return res.status(400).send({msg: "Wrong Password"} )}
    //

    const token = jwt.sign({ id: userInfo._id }, process.env.SCRT_KEY, {expiresIn: "48h",});
    res.status(200).send({ msg: "Wellcome " , user: userInfo ,  token });
  } catch (error) {
    res.status(400).send({msg: "Cannot Login " , error} );
  }
};


exports.getAllUsers = async(req , res) => {
  try {

    const token = req.headers["authorization"];
    if (!token) {return res.status(400).send({ errors: "not Authorized 1"  });}
    const decoded = jwt.verify(token, process.env.SCRT_KEY);
    const foundUser = await User.findOne({ _id: decoded.id });

      const allUsers = await User.find( { workAt : foundUser.workAt} ).populate('workBranch')
      res.status(200).send({msg : "Users" , allUsers})
  } catch (error) {
      res.status(400).send({msg : "Cant get Users" , error})
  }
}



exports.removeAlerts = async(req , res) => {
  try {
    const user = req.user
    
    const resault = await User.updateOne( { "_id" : user._id },{ $set: { "alerts": [] } });
      res.status(200).send({msg : "Done !" ,})
  } catch (error) {
      res.status(400).send({msg : "Cant Remove Alerts" , error})
  }
}
