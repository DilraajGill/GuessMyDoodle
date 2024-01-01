import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "./Database.js";
import { GoogleStrategy } from "passport-google-oauth20";
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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
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
    });
  } else {
    // Send that authorisation is false
    res.send({ auth: false });
  }
});
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: [profile, "email"] })
);

export default router;
