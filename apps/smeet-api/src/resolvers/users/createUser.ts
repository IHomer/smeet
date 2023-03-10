import { AppSyncResolverHandler } from 'aws-lambda';
import { User } from '@smeet/shared/graphql';
import { EventBridgeService, UserDataService } from '../../services';

export const handler: AppSyncResolverHandler<{ name: string }, User> = async ({
  arguments: user,
}) => {
  const createdUser = await UserDataService.create(user);

  await EventBridgeService.putEvents({
    source: 'users',
    detailType: 'NewUser',
    detail: createdUser,
  });

  return createdUser;
};
