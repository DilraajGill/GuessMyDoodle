import express from "express";

// Initialise the server and establish middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Listen on port 3001
const server = app.listen(3001);
