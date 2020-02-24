/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface IWrite<T, K> {
  create(item: Partial<T>): Promise<T>;
  update(key: K, item: Omit<Partial<T>, keyof K>): Promise<T>;
  delete(key: K, options?: Omit<DocumentClient.DeleteItemInput, 'Key' | 'TableName'>): Promise<boolean>;
}
