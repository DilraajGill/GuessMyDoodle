import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy } from "passport-local";

const router = express.Router()
// Connect to MongoDB server
mongoose.connect("mongodb://localhost:27017/project");
const userSchema = mongoose.Schema({
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.Model("User", userSchema);


export default router;