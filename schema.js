import { gql } from 'apollo-server-express';

import {
  getItems,
  getItem,
  getTopCommentsForItem,
  addStarToComment,
} from './dbRequests';
import { getTemperature } from './externalServices';

export const typeDefs = gql`
  type Query {
    items: [Item]
    item(id: ID!): Item
    mutation: Mutation
    temperature: Int
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

  type Mutation {
    addStarToComment(id: ID!): Comment
  }
`;

export const resolvers = {
  Query: {
    items: () => getItems(),
    item: (obj, { id }) => getItem(id),
    temperature: () => getTemperature(),
  },

  Item: {
    comments: (obj, { top }) => getTopCommentsForItem(obj.id, top),
  },

  Mutation: {
    addStarToComment: (obj, { id }) => addStarToComment(id),
  },
};
