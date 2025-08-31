import * as z from "zod";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export const validate = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse({
    body: req.body ?? {},
    params: req.params ?? {},
    query: req.query ?? {},
  });

  if (!result.success) {
    const issues = result.error.issues.map((e: z.ZodIssue) => `${e.message}`);
    console.log(issues);
    return next(new HttpError(400, issues.join("; ")));
  }

  next();
};
