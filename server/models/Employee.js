import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Using "export default" is standard for exporting a single main thing from a file.
const EmployeeModel = mongoose.model("Users", EmployeeSchema);
export default EmployeeModel;