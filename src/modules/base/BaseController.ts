/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 3/3/20
 */
import { Handler } from 'express';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export type ControllerRoute = {
  method: HttpMethod,
  path: string,
  handler: Handler,
}

export abstract class BaseController {
  protected path: string = '/';

  public abstract initRoutes(): ControllerRoute[];

  public getPath(): string {
    return this.path;
  }
}
