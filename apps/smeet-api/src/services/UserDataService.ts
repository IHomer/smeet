import { User } from '@smeet/shared/graphql';
import { DynamoService } from './DynamoDataService';
import { v4 as uuidv4 } from 'uuid';

const { DYNAMO_USER_TABLE = '' } = process.env;

export class UserDataService {
  static async create(user: { name: string }): Promise<User> {
    return await DynamoService.put<User>(
      { id: uuidv4(), ...user },
      DYNAMO_USER_TABLE
    );
  }
}
