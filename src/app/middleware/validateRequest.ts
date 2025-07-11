import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { AnyZodObject } from 'zod';

import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      //   cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;
