import mongoose from "mongoose";

// by default all users are admin 
// there is no normal user role here
const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", UserScheme);
export default User;