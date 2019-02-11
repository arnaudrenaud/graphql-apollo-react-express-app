import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Comment from './Comment';

class Home extends Component {
  async componentDidMount() {
    const response = await fetch('/api/items');
    const items = await response.json();
    this.props.onItemsFetched(items);
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>{item.name}</Link>
            <Comment
              id={item.comments[0].id}
              content={item.comments[0].content}
              numberOfStars={item.comments[0].numberOfStars}
              onStarAddedToCommentOnServer={this.props.onStarAddedToCommentOnServer(
                item.id
              )}
            />
          </li>
        ))}
      </ul>
    );
  }
}

Home.propTypes = {
  items: PropTypes.array.isRequired,
  onItemsFetched: PropTypes.func.isRequired,
  onStarAddedToCommentOnServer: PropTypes.func.isRequired,
};

export default Home;
