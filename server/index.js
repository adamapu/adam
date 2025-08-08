import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import your models using ESM syntax. It's good practice to include the .js extension.
import EmployeeModel from "./models/Employee.js";
import UserModel from './models/Users.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/CRUL")
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  console.log("Received GET request");
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json({ error: "Error fetching users", details: err }));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Received request to get user with ID: ${id}`);
  UserModel.findById({ _id: id })
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
  UserModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, task: req.body.task, age: req.body.task })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Received request to delete user with ID: ${id}`);
  UserModel.findByIdAndDelete({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.post("/createUser", (req, res) => {
  console.log("Received createUser request:", req.body);
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

// here is the part for login API
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running hooray");
});