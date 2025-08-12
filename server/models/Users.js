import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  userid: String,
  name: String,
  task: String,
  date: Date
});

const TaskModel = mongoose.model("Tasks", TaskSchema);
export default TaskModel;