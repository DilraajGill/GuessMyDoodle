import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

mongoose.connect("mongodb://localhost:27017/project");

// Create schema for User information
/**
 * Mongoose Schema for user information
 * @memberof AuthRouter
 */
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  username: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
});
// Add Passport-Local plugin and create the model
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

async function updateUserPoints(username, points) {}

async function fetchUserPoints(username) {}
