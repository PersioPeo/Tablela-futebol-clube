import { Request, Response, NextFunction } from 'express';
import Error from './ErrorType';

export default class Errors {
  static _error = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      const status = 404;
      const message = 'There is no team with such id!';
      res.status(status).json({ status, message });
    } else {
      const status = error.status || 505;
      const message = error.message || 'Something went wrong';
      res.status(status).json({ message });
    }
  };
}
