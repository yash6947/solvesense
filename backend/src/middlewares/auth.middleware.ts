import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config.js';
import { sendError } from '../utils/response.util.js';

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: 'STUDENT' | 'TEACHER' | 'INSTITUTE_ADMIN' | 'PLATFORM_ADMIN';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authentication token required', 401, 'UNAUTHORIZED');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as AuthUserPayload;
    req.user = decoded;
    return next();
  } catch (error) {
    return sendError(res, 'Invalid or expired authentication token', 401, 'INVALID_TOKEN');
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401, 'UNAUTHORIZED');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        'Access denied: You do not have permission for this resource',
        403,
        'FORBIDDEN'
      );
    }

    return next();
  };
};
