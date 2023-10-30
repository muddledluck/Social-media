import { Request, Response } from "express";
import { UserService } from "../user.template/user.service";

class AuthController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  };
}

export default AuthController;
