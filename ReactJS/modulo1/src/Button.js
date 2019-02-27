// eslint-disable-next-line no-unused-vars
import React from 'react';
import propTypes from 'prop-types';

const Button = (props) => (
  <button onClick={props.onClick}>{props.children}</button>
);

Button.defaultProps = {
  children: 'Salvar',
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.string,
};

export default Button;
