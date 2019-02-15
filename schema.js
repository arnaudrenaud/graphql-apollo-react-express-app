import { gql } from 'apollo-server-express';

import { getAllItemsWithTopComment } from './dbRequests';

export const typeDefs = gql`
  type Query {
    items: [Item]
  }

  type Item {
    id: ID
    name: String
    description: String
    comments: [Comment]
  }

  type Comment {
    id: ID
    content: String
    numberOfStars: Int
  }
`;

export const resolvers = {
  Query: {
    async items() {
      const rows = await getAllItemsWithTopComment();

      return rows.map(item => ({
        ...item,
        comments: [
          {
            id: item.commentId,
            content: item.commentContent,
            numberOfStars: item.commentNumberOfStars,
          },
        ],
      }));
    },
  },
};
