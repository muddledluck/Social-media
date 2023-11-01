import { Request, Response, NextFunction } from "express";
import Joi from "joi";

class JoiValidator {
  static validate(
    schema: Joi.ObjectSchema<any>,
    source: "body" | "params" | "query"
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      // response the all validation errors and convert them to key value pairs and remove the fields that are not in joi schema from the body
      const { error } = schema.validate(req[source], {
        abortEarly: false,
        allowUnknown: true,
      });
      if (error) {
        const errors: { [key: string]: string } = {};
        error.details.forEach((err) => {
          errors[err.path.join(".")] = err.message;
        });
        return res.sendBadRequest400Response("Validation Error", errors);
      }
      next();
    };
  }
}

export default JoiValidator;
