import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "./Database.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import PasswordValidator from "password-validator";
import "dotenv/config";

/**
 * Express router to handle authentication
 * @type {express.Router}
 * @class AuthRouter
 */
const router = express.Router();
// Connect to MongoDB server
mongoose.connect("mongodb://localhost:27017/project");

// Optimise passport for using strategy
passport.use(new Strategy(User.authenticate()));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
console.log(process.env.CLIENT_ID);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
          });
        }
        return cb(null, user);
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

const validator = new PasswordValidator();

validator.is().min(8).has().uppercase().has().symbols().has().not().spaces();

// Create route for logging in
/**
 * Route for sending login form to be processed
 * @name post/login
 * @function login
 * @memberof AuthRouter
 * @param {express.Request} req - Request object
 * @param {express.Response} res - Response object
 */
router.post("/login", passport.authenticate("local"), async (req, res) => {
  res.send({ auth: req.isAuthenticated() });
});

// Create route for registering a new user
/**
 * Route for sending register form to be processed
 * @name post/register
 * @function register
 * @memberof AuthRouter
 * @param {express.Request} req - Request object
 * @param {express.Response} res - Response object
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // Register user
    username = username.trim();
    if (!username) {
      return res.status(400).json({ message: "Username cannot be empty!" });
    }
    if (!validator.validate(password)) {
      return res
        .status(400)
        .json({ message: "Password does not meet the minimum requirements" });
    }
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
/**
 * Route for validating authentication
 * @name post/check-auth
 * @function checkAuth
 * @memberof AuthRouter
 * @param {express.Request} req - Request object
 * @param {express.Response} res - Response object
 */
router.get("/check-auth", async (req, res) => {
  if (req.isAuthenticated() && req.user) {
    // Send user information
    res.send({
      auth: true,
      username: req.user.username,
      points: req.user.points,
      purchasedTools: req.user.purchasedTools,
      profilePicture: req.user.profilePicture,
      purchasedProfilePicture: req.user.purchasedProfilePicture,
    });
  } else {
    // Send that authorisation is false
    res.send({ auth: false });
  }
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    if (!req.user.username) {
      res.redirect("http://localhost:3000/complete-profile");
    } else {
      res.redirect("http://localhost:3000/home");
    }
  }
);
router.post("/complete-profile", async (req, res) => {
  console.log("Updating profile");
  if (req.isAuthenticated() && req.user) {
    try {
      const user = await User.findById(req.user.id);
      user.username = req.body.username;
      await user.save();
      res.json({ success: true });
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(401).send("User not signed in");
  }
});

// https://www.passportjs.org/concepts/authentication/logout/
// Snippet utilised from documentation
router.get("/sign-out", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({ auth: false });
  });
});
export default router;

router.get("/check-username/:username", async (req, res) => {
  try {
    console.log("Checking");
    const username = req.params.username;
    const user = await User.findOne({ username: username });
    if (user) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to check username", error: error });
  }
});

router.get("/check-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    if (user) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Unable to check email", error: error });
  }
});
