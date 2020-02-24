/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { EntityNotFoundException } from '../errors/EntityNotFoundException';
import { IRead } from '../interfaces/IRead';
import { IWrite } from '../interfaces/IWrite';

type EntityConstructor<T> = new (raw: any) => T;

export class BaseRepository<T, K> implements IWrite<T, K>, IRead<T, K> {
  constructor(
    protected readonly docClient: DocumentClient,
    protected readonly tableName: string,
    private readonly entityClass: EntityConstructor<T>,
  ) {
  }

  public getDefaultParam(): { TableName: string } {
    return {
      TableName: this.tableName,
    }
  }

  public async create(item: Partial<T>): Promise<T> {
    // Create default partition key
    const putParams: DocumentClient.PutItemInput = {
      ...this.getDefaultParam(),
      Item: item,
    };

    await this.docClient.put(putParams).promise();

    return new this.entityClass(putParams.Item);
  }

  public async delete(
    key: K,
    options: Omit<DocumentClient.DeleteItemInput, 'Key' | 'TableName'> = {},
  ): Promise<boolean> {
    const deleteParams: DocumentClient.DeleteItemInput = {
      ...this.getDefaultParam(),
      ...options,
      Key: key,
    };
    const result = await this.docClient.delete(deleteParams).promise();
    return !!result;
  }


  public async findOne(key: K): Promise<T> {
    const getParams: DocumentClient.GetItemInput = {
      ...this.getDefaultParam(),
      Key: key,
    };
    const result = await this.docClient.get(getParams).promise();
    if (!result.Item) {
      throw new EntityNotFoundException(this.tableName);
    }
    return new this.entityClass(result.Item);
  }

  public async update(key: K, item: Omit<Partial<T>, keyof K>): Promise<T> {
    const updateParams: DocumentClient.PutItemInput = {
      ...this.getDefaultParam(),
      Item: {
        ...item,
        ...key,
      },
    };
    await this.docClient.put(updateParams).promise();
    return new this.entityClass(updateParams.Item);
  }

  public async query(query: Omit<DocumentClient.QueryInput, 'TableName'>): Promise<T[]> {
    const queryParams: DocumentClient.QueryInput = {
      ...query,
      ...this.getDefaultParam(),
    };
    const result = await this.docClient.query(queryParams).promise();
    const items: T[] = [];

    if (!result.Items) {
      return items;
    }

    for (const raw of result.Items) {
      items.push(new this.entityClass(raw));
    }
    return items;
  }
}
