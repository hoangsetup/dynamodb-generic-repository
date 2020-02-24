/* tslint:disable:no-console */

/**
 * Created by SUN-ASTERISK\dinh.van.hoang on 2/24/20
 */
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import fs from 'fs';
import { ENVIRONMENTS } from '../config';

(async () => {
  const docClient = new DynamoDB.DocumentClient({
    endpoint: ENVIRONMENTS.DYNAMO_ENDPOINT,
    region: ENVIRONMENTS.REGION,
  });

  console.log('Importing movies into DynamoDB. Please wait.');

  const allMovies: {
    year: number;
    title: string;
    info: string;
  }[] = JSON.parse(fs.readFileSync(`${__dirname}/data/moviedata.json`, 'utf8'));

  let promisesBatch: Promise<any>[] = [];
  for (const movie of allMovies) {
    const params: DocumentClient.PutItemInput = {
      TableName: 'Movies',
      Item: {
        'year':  movie.year,
        'title': movie.title,
        'info':  movie.info,
      },
    };

    const promise = docClient.put(params).promise()
      .then(_ => {
        console.error('Done: ', movie.title);
      })
      .catch(reason => {
        // Skip error and continue
        console.error('Error JSON:', JSON.stringify(reason, null, 2));
      });

    promisesBatch.push(promise);

    if (promisesBatch.length === 100) {
      await Promise.all(promisesBatch);
      // Clear batch
      promisesBatch = [];
    }
  }

  // Final block
  await Promise.all(promisesBatch);

  console.error('Done!');
})();
