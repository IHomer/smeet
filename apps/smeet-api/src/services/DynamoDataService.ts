import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { captureAWSv3Client } from 'aws-xray-sdk';

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

const client = captureAWSv3Client(new DynamoDBClient({}));

const dynamoDb = DynamoDBDocument.from(client, translateConfig);

export class DynamoService {
  static async put<T extends { id: string }>(
    item: any,
    table: string
  ): Promise<T> {
    console.log('SAVE', item);

    const params: UpdateCommandInput = {
      TableName: table,
      Key: {
        id: item.id,
      },
      ExpressionAttributeValues: {
        ':updatedAt': new Date().toISOString(),
      },
      UpdateExpression: 'set updatedAt = :updatedAt',
      ExpressionAttributeNames: {},
      ReturnValues: 'ALL_NEW',
    };

    for (const k in item) {
      /**
       * DynamoDB doesn't like setting an undefined value, so don't put them in the params!
       */
      if (!(k === 'id') && item[k] !== undefined) {
        if (
          params.UpdateExpression &&
          params.ExpressionAttributeValues &&
          params.ExpressionAttributeNames
        ) {
          params.UpdateExpression += `, #${k} = :${k}`;
          params.ExpressionAttributeValues[`:${k}`] = item[k];
          params.ExpressionAttributeNames[`#${k}`] = k;
        }
      }
    }

    console.log('PARAMS', params);

    const result = (await dynamoDb.update(params)).Attributes as unknown as T;

    console.log('RESULT', result);
    return result;
  }

  static async scan<T>(table: string): Promise<T[]> {
    const result = await dynamoDb.scan({ TableName: table });

    console.log('RESULT', result);
    return result.Items as T[];
  }
}
