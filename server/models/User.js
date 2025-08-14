import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  gender: String
});

// Using "export default" is standard for exporting a single main thing from a file.
const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;