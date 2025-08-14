import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import your models using ESM syntax. It's good practice to include the .js extension.
import UserModel from "./models/User.js";
import TaskModel from './models/Task.js';

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
  TaskModel.findByIdAndUpdate({ _id: id }, { name: req.body.name, task: req.body.task, date: req.body.date, status: req.body.status })
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
    const existingUser = await UserModel.findOne({
      $or: [
        { name: name },
        { email: email },
        { password: password }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ message: "Name, email, or password already exists" });
    }

    // 2. Create the new user
    const newUser = await UserModel.create({ name, email, password });
    return res.status(201).json(newUser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", (req, res) => {
  const { name, email, password } = req.body;
  UserModel.findOne({ name: name })
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

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create the new user
    const newUser = await UserModel.create({
      name,
      email,
      password,
      age,
      gender
    });

    return res.status(201).json({ 
      message: "User created successfully", 
      user: newUser 
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Edit user profile
// Update user profile by ID
app.put("/users/:userId", async (req, res) => {
  try {
    const { name, age, gender, password } = req.body;

    // Validate gender
    const allowedGenders = ["Male", "Female", "Prefer not to say"];
    if (gender && !allowedGenders.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender option" });
    }

    // Validate age
    if (age !== undefined && (isNaN(age) || age < 0)) {
      return res.status(400).json({ message: "Age must be a positive number" });
    }

    // Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      { name, age, gender, password }, // ⚠ Will overwrite fields if empty values are sent
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Get user profile by ID
app.get("/users/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});
