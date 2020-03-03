/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 3/3/20
 */
import { Request, Response } from 'express';
import { BaseController, ControllerRoute } from '../base/BaseController';

export class HomeController extends BaseController {
  constructor() {
    super();
    this.path = '/';
  }

  public initRoutes(): ControllerRoute[] {
    return [
      {
        path: '/',
        method: 'get',
        handler: this.index,
      },
      {
        path: '/info',
        method: 'get',
        handler: this.hello,
      },
    ];
  }

  public async index(): Promise<any> {
    return { message: 'Hello, World!'};
  }

  public async hello(req: Request, res: Response): Promise<any> {
    res.status(200).json({
      path: this.path,
      controller: this.constructor.name,
    })
  }
}
