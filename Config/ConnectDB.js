const mongoose = require("mongoose");

const ConnectDB = async () => {
    mongoose.set("strictQuery", false);
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Database is Linked... ")
    } catch (error) {
        console.log("...Database Cant Be Linked!")
    }
}

module.exports = ConnectDB;