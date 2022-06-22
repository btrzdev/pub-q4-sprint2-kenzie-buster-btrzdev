import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

const validateSchema =
  (shape: AnySchema) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const validated = await shape.validate(request.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      request.validated = validated;
      return next();
    } catch (error) {
      return response.status(400).json({ message: error.errors });
    }
  };
export default validateSchema;
