import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  task: String,
  date: Date
});

const UserModel = mongoose.model("Tasks", UserSchema);
export default UserModel;