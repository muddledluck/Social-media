import * as jwt from "jsonwebtoken";
import logger from "src/utils/logger";
class JwtService {
  private readonly secret: string;
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      logger.error("'JWT_SECRET is required in .env");
      throw new Error("'JWT_SECRET is required in .env");
    }
    this.secret = secret;
  }

  sign(payload: any, options?: Omit<jwt.SignOptions, "algorithm">) {
    return jwt.sign(payload, this.secret, options);
  }

  verify(token: string) {
    return jwt.verify(token, this.secret);
  }
}
export default JwtService;
