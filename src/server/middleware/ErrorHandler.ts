/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 3/3/20
 */
import { ErrorRequestHandler } from 'express';
import { HttpException } from '../../exceptions/HttpException';

export const ErrorHandler: ErrorRequestHandler = (err: HttpException, req, res, next) => {
  // tslint:disable-next-line:no-console
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';

  res.status(status).json({ status, message });
};
