import { graphqlFetch } from '@/app/util';
import { User } from '@/generated/graphql';

export const getUsers: () => Promise<User[]> = () => {
  return graphqlFetch(
    `
    query getUsers {
      listUsers {
        id
        email
      }
    }
  `,
  );
};
