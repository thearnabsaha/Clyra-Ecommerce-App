import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_VENDOR,JWT_SECRET_CUSTOMER } from '../config';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const jwtAuthVendor = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = jwt.verify(
      req.headers["authorization"] as string,
      JWT_SECRET_VENDOR as string
    ) as { id: string };
    if (decoded.id) {
      req.id = decoded.id;
      next();
    } else {
      res.status(401).json({"message":'Authorization Error'});
    }
  } catch (err) {
    res.status(500).send({'Authorization Error':err});
  }
};
export const jwtAuthCustomer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = jwt.verify(
      req.headers["authorization"] as string,
      JWT_SECRET_CUSTOMER as string
    ) as { id: string };
    if (decoded.id) {
      req.id = decoded.id;
      next();
    } else {
      res.status(401).json({"message":'Authorization Error'});
    }
  } catch (err) {
    res.status(500).send({'Authorization Error':err});
  }
};