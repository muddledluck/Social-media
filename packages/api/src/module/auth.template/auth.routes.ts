import express from "express";
import { createUserBodyValidator } from "./auth.schema";
import AuthController from "./auth.controller";
import JoiValidator from "../../utils/joiValidator";

const authRoute = express.Router();
const authController = new AuthController();

authRoute.post(
  "/create-user",
  JoiValidator.validate(createUserBodyValidator, "body"),
  authController.createUser
);

export default authRoute;
