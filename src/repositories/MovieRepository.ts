/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Movie } from '../entities/Movie';
import { IMovieKey } from '../entities/MovieDTO';
import { BaseRepository } from './base/BaseRepository';

export class MovieRepository extends BaseRepository<Movie, IMovieKey> {
  public static TABLE_NAME = 'Movies';

  constructor(docClient: DocumentClient) {
    super(docClient, MovieRepository.TABLE_NAME, Movie);
  }

  /**
   * Get movies of a year
   * @param {number} year Year to get
   * @returns {Promise<Movie[]>} List of movies
   */
  public getByYear(year: number): Promise<Movie[]> {
    return this.query({
      KeyConditionExpression: '#yr = :yyyy',
      ExpressionAttributeNames: {
        '#yr': 'year',
      },
      ExpressionAttributeValues: {
        ':yyyy': year,
      },
    });
  }
}
