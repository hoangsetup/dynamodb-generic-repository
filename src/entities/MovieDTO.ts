/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { MovieInfoDTO } from './MovieInfoDTO';

export interface IMovieKey {
  title: string;
  year: number;
}

export class MovieDTO implements IMovieKey {
  public title: string;
  public year: number;

  public info?: MovieInfoDTO;
}
