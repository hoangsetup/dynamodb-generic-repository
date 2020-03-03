/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 3/3/20
 */
import { Handler } from 'express';

export const NotFoundHandler: Handler = (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found!',
  });
};
