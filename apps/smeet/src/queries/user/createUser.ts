import gql from 'graphql-tag';
import { useMutation } from '@vue/apollo-composable';
import { User } from '@smeet/shared/graphql';

export const useCreateUser = () => {
  return useMutation<{createUser: User}>(
    gql`
      mutation ($name: String!) {
        createUser(name: $name) {
          id
          name
        }
      }
    `
  );
};
