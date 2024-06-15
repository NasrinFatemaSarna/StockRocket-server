const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const multer = require("multer")


const route = require("./src/routes/api")

app.use(cors())
app.use(bodyParser.json())

// app.use(rateLimit ({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
// }))





const uri =`mongodb+srv://mernpractice:<password>@cluster0.0uasavi.mongodb.net/StockRocket?retryWrites=true&w=majority`

const options = {user:"mernpractice", pass:"mernpractice"}

mongoose.connect(uri, options)
.then(()=>{console.log("database connected");})
.catch((err)=>{console.log(err)})







app.use("/api/v1", route)

app.use('*', (req, res) => {
    res.status(404).json({ message: "Not found" })
})
module.exports = app  