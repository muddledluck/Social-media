import { type Application, type Response } from "express";
import ResponseSenderMiddleware from "./responseSenderMiddleware";
import accessTokenVerifier from "./accessTokenVerifier";

const setupGlobalCustomMiddleware = (app: Application) => {
  // response sender middleware
  app.use((_req, res: Response, next) => {
    const responseSenderMiddleware = new ResponseSenderMiddleware(res);
    res.sendSuccess200Response =
      responseSenderMiddleware.sendSuccess200Response.bind(
        responseSenderMiddleware,
      );
    res.sendCreated201Response =
      responseSenderMiddleware.sendCreated201Response.bind(
        responseSenderMiddleware,
      );
    res.sendNoContent204Response =
      responseSenderMiddleware.sendNoContent204Response.bind(
        responseSenderMiddleware,
      );
    res.sendNotFound404Response =
      responseSenderMiddleware.sendNotFound404Response.bind(
        responseSenderMiddleware,
      );
    res.sendForbidden403Response =
      responseSenderMiddleware.sendForbidden403Response.bind(
        responseSenderMiddleware,
      );
    res.sendUnauthorized401Response =
      responseSenderMiddleware.sendUnauthorized401Response.bind(
        responseSenderMiddleware,
      );
    res.sendBadRequest400Response =
      responseSenderMiddleware.sendBadRequest400Response.bind(
        responseSenderMiddleware,
      );
    res.sendErrorResponse = responseSenderMiddleware.sendErrorResponse.bind(
      responseSenderMiddleware,
    );
    res.sendCustomSuccessResponse =
      responseSenderMiddleware.sendCustomSuccessResponse.bind(
        responseSenderMiddleware,
      );
    res.sendCustomErrorResponse =
      responseSenderMiddleware.sendCustomErrorResponse.bind(
        responseSenderMiddleware,
      );
    next();
  });
  // accessTokenVerifier middleware
  app.use(async (req, _res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1] ?? "";
    const userDetails = await accessTokenVerifier(accessToken);
    if (userDetails) {
      req.currentUser = userDetails;
    }
    next();
  });
};

export default setupGlobalCustomMiddleware;
