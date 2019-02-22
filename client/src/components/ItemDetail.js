import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Comment from './Comment';

const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
      description
      comments(top: 3) {
        id
        content
        numberOfStars
      }
    }
  }
`;

const getItemFragment = (id, client) => {
  return client.readFragment({
    id,
    fragment: gql`
      fragment itemName on Item {
        name
      }
    `,
  });
};

const ItemDetail = ({ id }) => (
  <Query query={GET_ITEM} variables={{ id }}>
    {({ loading, error, data, client }) => {
      const itemFragment = getItemFragment(id, client);
      if (loading) {
        return itemFragment ? 'Loading...' : <h1>{itemFragment.name}</h1>;
      }
      if (error) return `Error! ${error.message}`;

      const { item } = data;

      return (
        <Fragment>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <ol>
            {item.comments &&
              item.comments.map(({ id: commentId, content, numberOfStars }) => (
                <li key={commentId}>
                  <Comment
                    id={commentId}
                    content={content}
                    numberOfStars={numberOfStars}
                  />
                </li>
              ))}
          </ol>
        </Fragment>
      );
    }}
  </Query>
);

ItemDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ItemDetail;
