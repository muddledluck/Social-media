import { Request, Response, NextFunction } from "express";
import Joi from "joi";

class JoiValidator {
  static validate(
    schema: Joi.ObjectSchema<any>,
    source: "body" | "params" | "query"
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      const data = req[source];
      const { error } = schema.validate(data);
      if (error) {
        return res.status(400).json({
          error: "Validation error",
          message: error.details[0].message,
        });
      }
      next();
    };
  }
}

export default JoiValidator;
