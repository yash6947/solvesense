import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.util.js';
import { ZodError } from 'zod';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Unhandled Application Error:', err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    return sendError(
      res,
      'Validation Error',
      422,
      'VALIDATION_ERROR',
      err.errors.map((e) => ({ field: e.path.join('.'), message: e.message }))
    );
  }

  // Handle Prisma / Database Known Errors
  if (err.code === 'P2002') {
    return sendError(
      res,
      'Unique constraint violation on database record.',
      409,
      'DUPLICATE_RECORD',
      err.meta
    );
  }

  if (err.code === 'P2025') {
    return sendError(res, 'Record not found.', 404, 'RECORD_NOT_FOUND');
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, statusCode, err.code || 'INTERNAL_SERVER_ERROR');
};
