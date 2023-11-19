import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy } from "passport-local";

const router = express.Router();
// Connect to MongoDB server
mongoose.connect("mongodb://localhost:27017/project");
const userSchema = mongoose.Schema({
  email: String,
  password: String,
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/login", passport.authenticate("local"), async (req, res) => {
  res.send({ auth: req.isAuthenticated() });
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.register({ username }, password);
    req.login(newUser, async (err) => {
      if (err) {
        throw err;
      }
      res.json({ auth: req.isAuthenticated(), username: newUser.username });
    });
  } catch (err) {
    res.status(400).json({ name: err.name, message: err.message });
  }
});

router.get("/check-auth", async (req, res) => {
  if (req.isAuthenticated() && req.user) {
    res.send({ auth: true, username: req.user.username });
  } else {
    res.send({ auth: false });
  }
});

export default router;
