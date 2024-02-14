import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

mongoose.connect("mongodb://localhost:27017/project");

// Create schema for User information
/**
 * Mongoose Schema for user information
 * @memberof AuthRouter
 */
const userSchema = mongoose.Schema({
  googleId: String,
  email: { type: String, required: true, unique: true },
  password: String,
  username: { type: String, unique: true, sparse: true },
  points: { type: Number, default: 0 },
  purchasedTools: [{ type: String }],
  profilePicture: { type: String, default: "1.jpg" },
});
// Add Passport-Local plugin and create the model
userSchema.plugin(passportLocalMongoose);
export const User = mongoose.model("User", userSchema);

export async function updateUserPoints(username, points) {
  try {
    await User.findOneAndUpdate(
      { username: username },
      { $inc: { points: points } }
    );
  } catch (error) {
    console.error("Error updating points");
  }
}

export async function fetchUserPoints(username) {
  try {
    const user = await User.findOne({ username: username });
    return user.points;
  } catch (error) {
    console.error("Error fetching user");
  }
}

export async function fetchUserProfilePicture(username) {
  try {
    const user = await User.findOne({ username: username });
    return user.profilePicture;
  } catch (error) {
    console.error("Error fetching username");
  }
}
