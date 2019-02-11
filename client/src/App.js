import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ItemDetail from './components/ItemDetail';
import Home from './components/Home';

class App extends Component {
  state = {
    items: [],
  };

  updateItems = items => {
    this.setState({ items });
  };

  updateItem = item => {
    const { items } = this.state;

    this.setState({
      items: items.find(_item => _item.id === item.id)
        ? items.map(_item => (_item.id === item.id ? item : _item))
        : [...items, item],
    });
  };

  addStarToComment = itemId => commentId => {
    const item = this.state.items.find(_item => _item.id === itemId);

    this.updateItem({
      ...item,
      comments: item.comments.map(comment =>
        comment.id === commentId
          ? { ...comment, numberOfStars: comment.numberOfStars + 1 }
          : comment
      ),
    });
  };

  render() {
    const { items } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                items={items}
                onItemsFetched={this.updateItems}
                onStarAddedToCommentOnServer={this.addStarToComment}
              />
            )}
          />
          <Route
            exact
            path="/items/:id"
            render={({
              match: {
                params: { id },
              },
            }) => (
              <ItemDetail
                id={id}
                item={items.find(item => item.id === id)}
                onItemFetched={this.updateItem}
                onStarAddedToCommentOnServer={this.addStarToComment(id)}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
