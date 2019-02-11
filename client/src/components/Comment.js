import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TiStarFullOutline } from 'react-icons/ti';
import { FiChevronUp } from 'react-icons/fi';

class Comment extends Component {
  addStarToCommentOnServer = async () => {
    const { id, onStarAddedToCommentOnServer } = this.props;

    const response = await fetch(
      `/api/comments/${id}?field=numberOfStars&operation=increment`,
      {
        method: 'PATCH',
      }
    );
    if (!response.ok) {
      throw Error(response.statusText);
    }
    onStarAddedToCommentOnServer(id);
  };

  render() {
    const { content, numberOfStars } = this.props;

    return (
      <blockquote>
        <p>{`"${content}"`}</p>
        <TiStarFullOutline />
        {` ${numberOfStars} `}
        <FiChevronUp
          style={{ cursor: 'pointer' }}
          onClick={this.addStarToCommentOnServer}
        />
      </blockquote>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onStarAddedToCommentOnServer: PropTypes.func.isRequired,
  numberOfStars: PropTypes.number.isRequired,
};

export default Comment;
