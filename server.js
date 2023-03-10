const express = require("express");
const app = express();
const cors = require("cors")

require("dotenv").config();

const corsOptions = require("./Config/Cors");
app.use(cors(corsOptions))
app.use(express.json())



const ConnectDB = require("./Config/ConnectDB");
ConnectDB();



app.use("/api/user" , require("./Routes/user"))
app.use("/api/branch" , require("./Routes/branch"))
app.use("/api/item" , require("./Routes/item"))
app.get("/" , (req , res) => {
    res.send("API is Running...")
})


const PORT = process.env.PORT || 5421

app.listen(PORT , error => {
    error ? console.error(`failed to connect ${error}`) :
    console.log(`server is running on port : ${PORT}`)
})
