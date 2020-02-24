/* tslint:disable:variable-name */
/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */

import { ActorType, DirectorType, GenreType } from './types';

export class MovieInfoDTO {
  actors?: ActorType[];
  release_date?: string;
  plot?: string;
  genres?: GenreType[];
  image_url?: string;
  directors?: DirectorType[];
  rating?: number;
  rank?: number;
  running_time_secs?: number;
}
