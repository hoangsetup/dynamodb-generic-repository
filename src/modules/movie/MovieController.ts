/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 3/3/20
 */
import { Request } from 'express';
import { Movie } from '../../entities/Movie';
import { BaseController, ControllerRoute } from '../base/BaseController';
import { MovieService } from './MovieService';

export class MovieController extends BaseController {
  constructor(
    private readonly movieService: MovieService,
  ) {
    super();
    this.path = '/movies'
  }

  public initRoutes(): ControllerRoute[] {
    return [
      {
        method: 'get',
        path: '/:year',
        handler: this.getMoviesByYear,
      },
    ];
  }

  public getMoviesByYear(req: Request): Promise<Movie[]> {
    const year = parseInt(req.params.year, 10);
    return this.movieService.getMoviesByYear(year);
  }
}
