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

app.get("/", (req, res) => {
  console.log("Received GET request");
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json({ error: "Error fetching users", details: err }));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Received request to get user with ID: ${id}`);
  UserModel.findById({_id:id})
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({ error: "Error fetching user", details: err }));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel .findByIdAndUpdate({_id:id}, {name: req.body.name, email: req.body.email, age: req.body.age})
    .then (users => res.json(users))
    .catch(err => res.json(err))
})

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Received request to delete user with ID: ${id}`);
  UserModel.findByIdAndDelete({_id:id})
    .then (users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/createUser", (req,res)=> {
  console.log("Received createUser request:", req.body);
    UserModel.create(req.body)
    .then (users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running hooray")
})