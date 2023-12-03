import { type Request, type Response } from "express";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import emailService from "../../utils/emailService";

class AuthController {
  private readonly userService: UserService;
  private readonly authService: AuthService;
  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.create(req.body);
      const otp = await this.authService.generateVerificationOtp(user._id);
      // generate template
      const templateHtml = fs.readFileSync(
        path.join(__dirname, "../../view/otp.html"),
        "utf-8",
      );
      const compliedTemplate = Handlebars.compile(templateHtml);
      const html = compliedTemplate({ otp: otp.otp });
      await emailService.sendEmail({
        to: user.email,
        subject: "OTP Verification",
        html,
      });

      // create session
      const session = await this.authService.createSession({
        email: user.email,
        password: req.body.password,
        userAgent: req.headers["user-agent"] ?? "",
        ip: req.ip ?? "",
      });

      res.sendCreated201Response("User created successfully", session);
    } catch (error) {
      res.sendErrorResponse("Error creating user", error.message);
    }
  };

  public createSession = async (req: Request, res: Response) => {
    try {
      const session = await this.authService.createSession({
        email: req.body.email,
        password: req.body.password,
        userAgent: req.headers["user-agent"] ?? "",
        ip: req.ip ?? "",
      });
      res.sendSuccess200Response("Session created successfully", session);
    } catch (error) {
      res.sendErrorResponse("Error creating session", error.message);
    }
  };

  public generateAccessTokenFromRefreshToken = async (
    req: Request,
    res: Response,
  ) => {
    const { token } = req.body;
    const accessToken = this.authService.getAccessTokenFromRefreshToken(
      token as string,
    );
    if (!accessToken) {
      res.sendUnauthorized401Response(
        "Refresh token expired. Please re-authenticate to generate a new token.",
        {},
      );
    } else {
      res.sendSuccess200Response("New access token generated successfully.", {
        accessToken,
      });
    }
  };
}

export default AuthController;
