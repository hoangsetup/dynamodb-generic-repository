/* tslint:disable:no-console */
/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */

import { DynamoDB } from 'aws-sdk';
import express from 'express';
import { ENVIRONMENTS } from './config';
import { HomeController } from './modules/home/HomeController';
import { MovieController } from './modules/movie/MovieController';
import { MovieService } from './modules/movie/MovieService';
import { MovieRepository } from './repositories/MovieRepository';
import { App } from './server/App';

(async () => {
  const docClient = new DynamoDB.DocumentClient({
    endpoint: ENVIRONMENTS.DYNAMO_ENDPOINT,
    region: ENVIRONMENTS.REGION,
  });

  const movieRepo = new MovieRepository(docClient);
  const movieService = new MovieService(movieRepo);


  const app = new App({
    port: ENVIRONMENTS.PORT,
    controllers: [
      new HomeController(),
      new MovieController(movieService),
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
