import { UserService } from "../module/user/user.service";
import { AuthService } from "../module/auth/auth.service";
import { type JwtAccessTokenClaims } from "../module/auth/auth.types";
import JwtService from "../utils/jwt";
import { type UserDocument } from "../models/user";
async function accessTokenVerifier(
  accessToken: string,
): Promise<UserDocument | null> {
  try {
    const jwtService = new JwtService();
    const authService = new AuthService();
    const userService = new UserService();
    const decoded = jwtService.verify(accessToken) as JwtAccessTokenClaims;
    if (!decoded) {
      return null;
    }
    const { sessionId } = decoded;
    const userSession =
      await authService.getUserSessionDetailsBySessionId(sessionId);
    if (!userSession || !userSession.isValidSession) {
      return null;
    }
    const userDetails = await userService.findById(userSession.userId);
    return userDetails;
  } catch (error) {
    return null;
  }
}
export default accessTokenVerifier;
