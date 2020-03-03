/* tslint:disable:no-console */
/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 3/3/20
 */
import express, { Application, ErrorRequestHandler, Handler, Router } from 'express';
import { Server } from 'http';
import { BaseController } from '../modules/base/BaseController';
import { ErrorHandler } from './middleware/ErrorHandler';
import { NotFoundHandler } from './middleware/NotFoundHandler';

export type AppInitialize = {
  port: number;
  basePath: string;
  middleware: Handler[];
  controllers: BaseController[];
  notFoundHandler: Handler;
  errorHandler: ErrorRequestHandler;
}

export class App {
  public readonly app: Application;
  private readonly port: number;
  private readonly basePath: string;

  constructor(
    {
      port = 8080,
      basePath = '/',
      middleware = [],
      controllers = [],
      notFoundHandler = NotFoundHandler,
      errorHandler = ErrorHandler,
    }: Partial<AppInitialize>,
  ) {
    this.app = express();
    this.port = port;
    this.basePath = basePath!;

    this.registerMiddleware(middleware);

    this.registerControllers(controllers);

    this.registerErrorHandlers(notFoundHandler!, errorHandler!);
  }

  public start(): Server {
    return this.app.listen(this.port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }

  private registerMiddleware(middleware: Handler[] = []) {
    middleware.forEach((handler) => {
      this.app.use(handler);
    });
  }

  private registerControllers(controllers: BaseController[] = []) {
    const routeInfo: {
      method: string,
      path: string,
      handler: string,
    }[] = [];

    controllers.forEach((controller) => {
      const path = this.basePath + controller.getPath() !== '/' ? controller.getPath() : '';

      const controllerRoutes = controller.initRoutes();

      const router = Router({ mergeParams: true });

      controllerRoutes.forEach((controllerRoute) => {
        if (!router[controllerRoute.method]) {
          throw new Error(`Method ${controllerRoute.method} did not supported!`);
        }
        router[controllerRoute.method](controllerRoute.path, async (req, res, next) => {
          try {
            const result = await controllerRoute.handler.bind(controller)(req, res, next);
            if (!res.headersSent) {
              res.status(200).json(result);
            }
          } catch (e) {
            next(e);
          }
        });
      });

      routeInfo.push(...controllerRoutes.map((r) => {
        return {
          method: r.method.toUpperCase(),
          path: controller.getPath() + r.path !== '/' ? r.path : '',
          handler: `${controller.constructor.name}.${r.handler.name}`,
        }
      }));

      this.app.use(path, router);
    });

    console.log(`${'Method'.padEnd(10)}${'Path'.padEnd(20)}${'Handler'}`);
    routeInfo.forEach((info) => {
      console.log(`${info.method.padEnd(10)}${info.path.padEnd(20)}${info.handler}`);
    });
  }

  private registerErrorHandlers(notFoundHandler: Handler, errorHandler: ErrorRequestHandler) {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }
}
