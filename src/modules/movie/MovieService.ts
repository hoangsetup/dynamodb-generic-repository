/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 3/3/20
 */
import { Movie } from '../../entities/Movie';
import { MovieRepository } from '../../repositories/MovieRepository';
import { BaseService } from '../base/BaseService';

export class MovieService extends BaseService {
  constructor(
    private readonly movieRepo: MovieRepository,
  ) {
    super();
  }

  public getMoviesByYear(year: number): Promise<Movie[]> {
    return this.movieRepo.getByYear(year);
  }
}
