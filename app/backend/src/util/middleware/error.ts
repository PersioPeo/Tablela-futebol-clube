import { Request, Response, NextFunction } from 'express';
import Error from './ErrorType';

export default class Errors {
  static _error = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const status = error.status || 505;
    const message = error.message || 'Something went wrong';
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    } if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res
        .status(404)
        .json({ message: 'There is no team with such id!' });
    }
    return res.status(status).json({ message });
  };
}
