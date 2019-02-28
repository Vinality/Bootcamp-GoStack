/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Components/Header';
import Post from './Components/Post';
import './styles.scss';

class App extends Component {
  state = {
    posts: [
      {
        id: 1,
        name: 'Vinality',
        avatar: ' ',
        time: 'há 3 min',
        body:
          'Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget libero posuere vulputate. Etiam elit elit, elementum sed varius at, adipiscing vitae est. Sed nec felis',
      },
      {
        id: 2,
        name: 'Rocketseat',
        avatar: ' ',
        time: 'há 30 min',
        body:
          'Pellentesque, lacinia dui sed, ultricies sapien. Pellentesque orci lectus, consectetur vel posuere posuere, rutrum eu ipsum.',
      },
    ],
  };

  render() {
    const {posts} = this.state;
    return (
      <div>
        <Header />
        <div className="post-container">
          {posts && posts.map((post) => <Post key={post.id} data={post} />)}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
