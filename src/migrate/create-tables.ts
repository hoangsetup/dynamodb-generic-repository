/* tslint:disable:no-console */
/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */

import { DynamoDB } from 'aws-sdk';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
import { ENVIRONMENTS } from '../config';

(async () => {
  const dynamodb = new DynamoDB({
    endpoint: ENVIRONMENTS.DYNAMO_ENDPOINT,
    region: ENVIRONMENTS.REGION,
  });

  const params: CreateTableInput = {
    TableName: 'Movies',
    KeySchema: [
      { AttributeName: 'year', KeyType: 'HASH' },  // Partition key
      { AttributeName: 'title', KeyType: 'RANGE' },  // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'year', AttributeType: 'N' },
      { AttributeName: 'title', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  try {
    const result = dynamodb.createTable(params).promise();
    console.log('Created table. Table description JSON:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(error, null, 2));
  }
})();
