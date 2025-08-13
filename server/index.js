import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import your models using ESM syntax. It's good practice to include the .js extension.
import EmployeeModel from "./models/Employee.js";
import TaskModel from './models/Users.js';

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("server is running hooray");
});

mongoose.connect("mongodb://localhost:27017/CRUL")
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

app.get("/updateTask/:id", (req, res) => {
  const id = req.params.id; // This is the task ID from the URL
  console.log(`Received request to get tasks for task ID: ${id}`);

  TaskModel.findOne({_id: id }) // find ALL tasks that belong to this user
    .then(tasks => {
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ error: "No record for this task" });
      }
      res.json(tasks);
    })
    .catch(err => 
      res.status(500).json({ 
        error: "Error fetching tasks for this task", 
        details: err 
      })
    );
});

app.get("/getTask/:id", (req, res) => {
  const id = req.params.id; // This is the user ID from the URL
  console.log(`Received request to get tasks for user ID: ${id}`);

  TaskModel.find({userid: id }) // find ALL tasks that belong to this user
    .then(tasks => {
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ error: "No tasks found for this user" });
      }
      res.json(tasks);
    })
    .catch(err => 
      res.status(500).json({ 
        error: "Error fetching tasks for this user", 
        details: err 
      })
    );
});


app.put("/updateTask/:id", (req, res) => {
  const id = req.params.id;
  TaskModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, task: req.body.task, date: req.body.date })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.delete("/deleteTask/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Received request to delete task with ID: ${id}`);
  TaskModel.findByIdAndDelete({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.post("/createTask", (req, res) => {
  console.log("Received createUser request:", req.body);
  TaskModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});














// here is the part for login API

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if any of them already exists
    const existingUser = await EmployeeModel.findOne({
      $or: [
        { name: name },
        { email: email },
        { password: password } // ⚠ Not recommended to check password like this in real apps (hash passwords instead)
      ]
    });

    if (existingUser) {
      return res.status(400).json({ message: "Name, email, or password already exists" });
    }

    // 2. Create the new user
    const newUser = await EmployeeModel.create({ name, email, password });
    return res.status(201).json(newUser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/login", (req, res) => {
  const { name, email, password } = req.body;

  EmployeeModel.findOne({ name: name })
    .then(user => {
      if (user) {
        if (user.email === email) {
          if (user.password === password) {
            res.json({message: "Success", id: user._id});
          } else {
            res.json("password incorrect");
          }
        } else {
          res.json("email incorrect");
        }
      } else {
        res.json("username incorrect");
      }
    })
    .catch(err => {
      res.json(err);
    });
});