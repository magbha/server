const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json())

const ConnectDB = require("./Config/ConnectDB")
ConnectDB();


app.use("/api/user" , require("./Routes/user"))
app.use("/api/branch" , require("./Routes/branch"))
app.use("/api/item" , require("./Routes/item"))

const PORT = process.env.PORT

app.listen(PORT , error => {
    error ? console.error(`failed to connect ${error}`) :
    console.log(`server is running on port : ${PORT}`)
})