import { Chat, ChatInput } from '@smeet/shared/graphql';
import { DynamoService } from './DynamoDataService';
import { v4 as uuidv4 } from 'uuid';
import { Object } from 'ts-toolbelt';

const { DYNAMO_CHAT_TABLE = '' } = process.env;

export class ChatDataService {
  static async create(chat: ChatInput): Promise<Chat> {
    return await DynamoService.put<Chat>(
      { ...chat, id: uuidv4() },
      DYNAMO_CHAT_TABLE
    );
  }

  static async list(): Promise<Chat[]> {
    return DynamoService.scan<Chat>(DYNAMO_CHAT_TABLE);
  }
}
