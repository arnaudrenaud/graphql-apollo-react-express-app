import { gql } from 'apollo-server-express';

import { getItems, getItem, getTopCommentsForItem } from './dbRequests';

export const typeDefs = gql`
  type Query {
    items: [Item]
    item(id: ID!): Item
  }

  type Item {
    id: ID
    name: String
    description: String
    comments(top: Int!): [Comment]
  }

  type Comment {
    id: ID
    content: String
    numberOfStars: Int
  }
`;

export const resolvers = {
  Query: {
    items: () => getItems(),
    item: (obj, { id }) => getItem(id),
  },

  Item: {
    comments: (obj, { top }) => getTopCommentsForItem(obj.id, top),
  },
};
