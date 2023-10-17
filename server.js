import express from "express";
import passport from "passport";
import session from "express-session"

// Initialise the server and establish middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
      secret: "HiddenSecret.",
      resave: false,
      saveUninitialized: false,
    })
  );

// Listen on port 3001
const server = app.listen(3001);
