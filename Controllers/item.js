const Item = require("../Models/Item");
const User = require("../Models/User");




exports.addItem = async (req , res) => {
    try {
        const thisDate = new Date().toLocaleDateString('en-GB');
        const {itemName , manufacture , createdBy , itemBranch , aboutItem , itemPrice , qty ,itemType , itemBusiness , addDate} = req.body;
        const user = req.user
        if (JSON.stringify(user.workBranch) === JSON.stringify(itemBranch)) {

          const newItem = await new Item({ itemName , manufacture , createdBy , itemBranch , aboutItem , itemPrice , qty , itemType , itemBusiness , addDate});
          newItem.save();
          await User.updateOne( { "_id" : itemBusiness },{ $push: { "alerts": `new Item ${itemName} Created by ${user.firstName} : ${thisDate} ` } });
          res.status(200).send({ user: newItem });

        } else {
          return res.status(400).send({msg : "You Cant Add item in this Branch"  })
        }
      } catch (error) {
        return res.status(400).send({ msg: "Cant add Item" , error });
      }
}


exports.getAllItems = async(req , res) => {
  try {
      const user = req.user
      const {_id} = req.params  


      const allItems = await Item.find({itemBranch : _id}).populate("createdBy")
      const itemCount = await Item.find({itemBusiness : user.workAt}).count()
      
   
      
      res.status(200).send({msg : "Items" , allItems , itemCount })
    } catch (error) {
      res.status(400).send({msg : "Cant get Items" , error})
    }
  }
  
  
  exports.removeItem = async(req , res) => {
    try {
    const thisDate = new Date().toLocaleDateString('en-GB');
    const {_id} = await req.params;
    const item = await Item.findById({_id})
    const user = req.user
    if (JSON.stringify(user.workBranch) === JSON.stringify(item.itemBranch)) {
      const resault = await User.updateOne( { "_id" : user.workAt },{ $push: { "alerts": `${user.firstName} Deleted ${item.itemName} : ${thisDate} ` } });
      await Item.findByIdAndDelete({_id})
    } else {
      return res.status(400).send({msg : "You cant delete this item"  })
    }
    res.status(200).send({msg : "Item Deleted"})
  } catch (error) {
   return  res.status(400).send({msg : "Cannot Delete Item" , err : error.message  })
  }
}


exports.getItem = async(req , res) => {
  try {
    const {_id} = req.params;
    const item =  await Item.findById({_id})
    res.status(200).send({msg : "This Item" , item})        
} catch (error) {
    res.status(400).send({msg : "cannot find Item" , error })
}
}


exports.updateItem = async(req , res) => {
  try {
    const thisDate = new Date().toLocaleDateString('en-GB');
    const {_id} = await req.params;
    const item = await Item.findById({_id})
    const user = req.user
    if (JSON.stringify(user.workBranch) === JSON.stringify(item.itemBranch)) {
      const resault = await User.updateOne( { "_id" : user.workAt },{ $push: { "alerts": `${user.firstName} Updated ${item.itemName} : ${thisDate}` } });
      await Item.findByIdAndUpdate({_id} , {$set : {...req.body}})
     
    } else {
      return res.status(400).send({msg : "You cant edit this item"  })
    }
    
    res.status(200).send({msg : "Item Updated!" })
} catch (error) {
   return  res.status(400).send({msg : "Cannot Update" , error})
}
}