import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';
import { Resolvers, QueryResolvers } from '@/generated/graphql';
import { cookies } from 'next/headers';
const schemaPath = path.resolve('./schema.graphql');
const typeDefs = readFileSync(schemaPath, 'utf8');

const queryResolvers: QueryResolvers = {
  listUsers: async (_, __, context) => {
    return [context.user];
  },
};

const resolvers: Resolvers = {
  Query: queryResolvers,
};

const server = new ApolloServer<object>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => {
    await cookies();
    return {
      user: {'id': 1, 'email': 'test@test.test'},
    }
  },
});
