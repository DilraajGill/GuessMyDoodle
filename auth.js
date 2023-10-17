import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy } from "passport-local";

const router = express.Router()
// Connect to MongoDB server
mongoose.connect("mongodb://localhost:27017/project");

export default router;