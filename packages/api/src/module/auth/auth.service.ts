import {
  type JwtAccessTokenPayload,
  type CreateSessionType,
  type JwtRefreshTokenPayload,
  type JwtRefreshTokenClaims,
} from "./auth.types";
import {
  UserModel,
  UserSessionModel,
  VerificationOtpModel,
} from "../../models";
import JwtService from "../../utils/jwt";
import { UserService } from "../user/user.service";

export class AuthService {
  private readonly jwtService = new JwtService();
  private readonly userService = new UserService();
  private readonly userSessionModel = UserSessionModel;
  private readonly verificationOtpModel = VerificationOtpModel;

  public async createSession(payload: CreateSessionType) {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await user.comparePassword(payload.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    // create session
    const session = await this.userSessionModel.create({
      userId: user._id,
      userAgent: payload.userAgent,
      ipAddress: payload.ip,
    });
    // create accessToken and refreshToken
    const accessTokenPayload: JwtAccessTokenPayload = {
      sessionId: session._id,
      isVerifiedEmail: user.isVerifiedEmail,
      isLocked: user.isLocked,
    };
    const accessToken = this.createAccessToken(accessTokenPayload);
    const refreshTokenPayload: JwtRefreshTokenPayload = {
      sessionId: session._id,
    };
    const refreshToken = this.createRefreshToken(refreshTokenPayload);
    return { accessToken, refreshToken };
  }

  private createAccessToken(payload: JwtAccessTokenPayload) {
    return this.jwtService.sign(payload, { expiresIn: "1h" });
  }

  private createRefreshToken(payload: JwtRefreshTokenPayload) {
    return this.jwtService.sign(payload, { expiresIn: "30d" });
  }

  public async generateVerificationOtp(userId: string) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const payload = {
      otp,
      userId,
    };
    const verificationOtp = await this.verificationOtpModel.create(payload);
    return verificationOtp;
  }

  public async verifyOtp(userId: string, otp: string) {
    const verificationOtp = await this.verificationOtpModel.findOne({
      userId,
      otp,
    });
    if (!verificationOtp) {
      throw new Error("Invalid OTP");
    }
    return verificationOtp;
  }

  public async getUserSessionDetailsBySessionId(sessionId: string) {
    const session = await this.userSessionModel.findById(sessionId);
    return session;
  }

  public async getAccessTokenFromRefreshToken(refreshToken: string) {
    // Verify refreshToken
    const decoded = this.jwtService.verify(
      refreshToken,
    ) as JwtRefreshTokenClaims;
    if (!decoded) {
      return null;
    }
    const { sessionId } = decoded;
    const userSession = await this.getUserSessionDetailsBySessionId(sessionId);
    if (!userSession || !userSession.isValidSession) {
      return null;
    }
    // Generate accessToken
    const userDetails = await this.userService.findById(userSession.userId);
    if (userDetails) {
      const accessTokenPayload: JwtAccessTokenPayload = {
        sessionId: userSession._id,
        isVerifiedEmail: userDetails.isVerifiedEmail,
        isLocked: userDetails.isLocked,
      };
      const accessToken = this.createAccessToken(accessTokenPayload);
      return accessToken;
    }
    return null;
  }
}
