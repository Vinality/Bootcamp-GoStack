/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';
import PostHeader from './PostHeader';

const Post = (props) => (
  <div className="post">
    <PostHeader name={props.data.name}
      avatar={props.data.avatar}
      time={props.data.time} />
    <p>{props.data.body}</p>
  </div>
);

Post.propTypes = {
  data: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    avatar: propTypes.string.isRequired,
    time: propTypes.string.isRequired,
    body: propTypes.string.isRequired,
  }).isRequired,
};

export default Post;
