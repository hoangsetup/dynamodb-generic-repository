/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { MovieDTO } from './MovieDTO';
import { ActorType } from './types';

export class Movie extends MovieDTO {
  constructor(movieData: MovieDTO) {
    super();
    Object.assign(this, movieData);
  }

  /**
   * Get list actors of movie
   * @returns {ActorType[]}
   */
  public getActors(): ActorType[] {
    return this.info?.actors ? this.info.actors : [];
  }
}
