import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';

const client = new EventBridgeClient({ region: process.env['AWS_REGION'] });

export interface EventEntry {
  source: string;
  detailType: string;
  detail: unknown;
}

export class EventBridgeService {
  static putEvents(...events: EventEntry[]) {
    return client.send(
      new PutEventsCommand({
        Entries: events.map((it) => ({
          Source: it.source,
          DetailType: it.detailType,
          Detail: JSON.stringify(it.detail),
          EventBusName: process.env['STAGE'],
        })),
      })
    );
  }
}
