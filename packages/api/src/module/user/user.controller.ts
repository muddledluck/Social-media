import { type Request, type Response } from "express";
import { UserService } from "./user.service";

class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public getUserDetails(req: Request, res: Response) {
    const { currentUser } = req;
    const { userId } = req.query;
    if (userId) {
      const user = this.userService.findById(userId as string);
      if (!user) {
        res.sendNotFound404Response("User Not Found", {});
        return;
      }
      res.sendSuccess200Response("Fetched User details successfully", user);
      return;
    }
    res.sendSuccess200Response(
      "Fetched User details successfully",
      currentUser,
    );
  }
}

export default UserController;
