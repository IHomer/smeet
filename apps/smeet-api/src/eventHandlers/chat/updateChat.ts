// import type { EventBridgeHandler } from 'aws-lambda';

// import type { Chat } from '@smeet/shared/graphql';
// import { ApolloClientFactory } from '@smeet/shared/server-side-apollo';
// import gql from 'graphql-tag';

// export const handler: EventBridgeHandler<'UpdateChat', Chat, void> = async (
//   event
// ) => {
//   const apollo = await ApolloClientFactory.getInstance();

//   await apollo.mutate({
//     mutation: gql`
//       mutate NewChatMessage()
//     `,
//   });
// };
