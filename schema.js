import { gql } from 'apollo-server-express';

import {
  getAllItemsWithTopComment,
  getItemDetailsWithTopThreeComments,
} from './dbRequests';

export const typeDefs = gql`
  type Query {
    items: [Item]
    item(id: ID!): Item
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

    async item(obj, { id }) {
      const rows = await getItemDetailsWithTopThreeComments(id);

      if (!rows.length) {
        return {};
      }
      return {
        id: rows[0].id,
        name: rows[0].name,
        description: rows[0].description,
        comments: rows.map(row => ({
          id: row.commentId,
          content: row.commentContent,
          numberOfStars: row.commentNumberOfStars,
        })),
      };
    },
  },
};
