const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const UserModel = require('./models/Users')

mongoose.connect("mongodb://localhost:27017/CRUL")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err))


app.post("/createUser", (req,res)=> {
  console.log("Received createUser request:", req.body);
    UserModel.create(req.body.name)
    .then (users => res,json(users))
    .catch(err => res,json(err))
})

app.listen(3001, () => {
    console.log("server is running hooray")
})