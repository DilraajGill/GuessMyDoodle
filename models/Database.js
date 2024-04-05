import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Connect to the MongoDB server
mongoose.connect("mongodb://localhost:27017/project");

// Create schema for User information
/**
 * Mongoose Schema for user information
 * @memberof AuthRouter
 * @typedef {Object} UserSchema
 * @property {string} googleId - Google identifier for signing in with Google
 * @property {string} email - User's email address
 * @property {string} password - Password of the user
 * @property {string} username - Username of the user
 * @property {number} points - The number of points associated to the user
 * @property {string[]} purchasedTools - List of tools owned by the user
 * @property {string} profilePicture - The default profile picture for the user
 * @property {string[]} purchasedProfilePicture - List of profile pictures that the user owns
 */
const userSchema = mongoose.Schema({
  googleId: String,
  email: { type: String, required: true, unique: true },
  password: String,
  username: { type: String, unique: true, sparse: true },
  points: { type: Number, default: 0 },
  purchasedTools: [{ type: String }],
  profilePicture: { type: String, default: "1.jpg" },
  purchasedProfilePicture: { type: [String], default: ["1.jpg"] },
});
// Add Passport-Local plugin and create the model
userSchema.plugin(passportLocalMongoose);
export const User = mongoose.model("User", userSchema);

/**
 * Update the amount of points associated to the user
 * @param {string} username - Username of the user
 * @param {number} points - Number of points that the value should increment by
 */
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
/**
 * Fetch the points associated to the user
 * @param {string} username - Username being fetched
 * @returns {number} The number of points of the user
 */
export async function fetchUserPoints(username) {
  try {
    const user = await User.findOne({ username: username });
    return user.points;
  } catch (error) {
    console.error("Error fetching user");
  }
}
/**
 * Fetch the profile picture associated to the user
 * @param {string} username - Username of the account to fetch the profile picture
 * @returns {string} The profile picture associated to the user
 */
export async function fetchUserProfilePicture(username) {
  try {
    const user = await User.findOne({ username: username });
    return user.profilePicture;
  } catch (error) {
    console.error("Error fetching username");
  }
}
/**
 * Delete the user from their username
 * @param {string} username - Delete user functionality
 * @returns {boolean} Return boolean according to if the account was deleted
 */
export async function deleteUser(username) {
  try {
    await User.findOneAndDelete({ username: username });
    return true;
  } catch (error) {
    console.error("Account does not exist!");
    return false;
  }
}
