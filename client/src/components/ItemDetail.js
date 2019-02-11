import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

class ItemDetail extends Component {
  async componentDidMount() {
    const { id, onItemFetched } = this.props;

    const response = await fetch(`/api/items/${id}`);
    const item = await response.json();
    onItemFetched(item);
  }

  render() {
    const { item } = this.props;

    if (!item) {
      return null;
    }

    return (
      <Fragment>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <ol>
          {item.comments &&
            item.comments.map(({ id, content, numberOfStars }) => (
              <li key={id}>
                <Comment
                  id={id}
                  content={content}
                  numberOfStars={numberOfStars}
                  onStarAddedToCommentOnServer={
                    this.props.onStarAddedToCommentOnServer
                  }
                />
              </li>
            ))}
        </ol>
      </Fragment>
    );
  }
}

ItemDetail.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.object,
  onItemFetched: PropTypes.func.isRequired,
  onStarAddedToCommentOnServer: PropTypes.func.isRequired,
};

ItemDetail.defaultProps = {
  item: null,
};

export default ItemDetail;
