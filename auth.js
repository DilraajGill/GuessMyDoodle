import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy } from "passport-local";

const router = express.Router();
// Connect to MongoDB server
mongoose.connect("mongodb://localhost:27017/project");
// Create schema for User information
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  username: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
});
// Add Passport-Local plugin and create the model
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

// Optimise passport for using strategy
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Create route for logging in
router.post("/login", passport.authenticate("local"), async (req, res) => {
  res.send({ auth: req.isAuthenticated() });
});

// Create route for registering a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // Register user
    const newUser = await User.register({ email, username }, password);
    req.login(newUser, async (err) => {
      if (err) {
        throw err;
      }
      res.json({ auth: req.isAuthenticated(), username: newUser.username });
    });
  } catch (err) {
    // If an error, emit the error name and message
    res.status(400).json({ name: err.name, message: err.message });
  }
});

// Define a route for checking authentication status
router.get("/check-auth", async (req, res) => {
  if (req.isAuthenticated() && req.user) {
    // Send user information
    res.send({
      auth: true,
      username: req.user.username,
      points: req.user.points,
    });
  } else {
    // Send that authorisation is false
    res.send({ auth: false });
  }
});

export default router;
