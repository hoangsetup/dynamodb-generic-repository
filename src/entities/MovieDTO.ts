/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { MovieInfoDTO } from './MovieInfoDTO';

export class MovieDTO {
  public title: string;
  public year: number;

  public info?: MovieInfoDTO;
}
