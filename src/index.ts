/* tslint:disable:no-console */
/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */

import express from 'express';
import { ENVIRONMENTS } from './config';
import { HomeController } from './modules/home/HomeController';
import { App } from './server/App';

(async () => {
  const app = new App({
    port: ENVIRONMENTS.PORT,
    controllers: [
      new HomeController(),
    ],
    middleware: [
      express.json(),
      express.urlencoded({ extended: true }),
      (req, res, next) => {
        console.log('Request logged:', req.method, req.path);
        next();
      },
    ],
  });

  app.start();
})();
