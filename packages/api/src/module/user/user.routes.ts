import express from "express";
import UserController from "src/module/user/user.controller";

const userController = new UserController();
const userRoute = express.Router();

userRoute.get("/get-user-details", userController.getUserDetails);

export default userRoute;
