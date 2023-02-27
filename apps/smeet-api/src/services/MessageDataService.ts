import { Message, MessageInput } from '@smeet/shared/graphql';
import { DynamoService } from './DynamoDataService';
import { v4 as uuidv4 } from 'uuid';
import { Object } from 'ts-toolbelt';

const { DYNAMO_MESSAGE_TABLE = '' } = process.env;

export class MessageDataService {
  static async create(message: MessageInput): Promise<Message> {
    return await DynamoService.put<Message>(
      { ...message, id: uuidv4() },
      DYNAMO_MESSAGE_TABLE
    );
  }

  static async list(): Promise<Message[]> {
    return DynamoService.scan<Message>(DYNAMO_MESSAGE_TABLE);
  }
}
