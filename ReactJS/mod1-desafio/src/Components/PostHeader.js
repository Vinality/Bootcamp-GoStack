/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';

const PostHeader = (props) => (
  <div className="post-header-container">
    <img className="avatar" src={props.avatar} alt="avatar" />
    <div className="data-container">
      <strong>{props.name}</strong>
      <span>{props.time}</span>
    </div>
  </div>
);

PostHeader.propTypes = {
  name: propTypes.string.isRequired,
  avatar: propTypes.string.isRequired,
  time: propTypes.string.isRequired,
};

export default PostHeader;

