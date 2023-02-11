import { AppSyncResolverHandler } from 'aws-lambda';
import { User } from '@smeet/shared/graphql';
import { UserDataService } from '../../services/UserDataService';

export const handler: AppSyncResolverHandler<{ name: string }, User> = async ({
  arguments: user,
}) => {
  return UserDataService.create(user);
};
