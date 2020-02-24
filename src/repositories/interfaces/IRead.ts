/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface IRead<T, K> {
  query(queryParams: Omit<DocumentClient.QueryInput, 'TableName'>): Promise<T[]>;
  findOne(key: K): Promise<T>;
}
