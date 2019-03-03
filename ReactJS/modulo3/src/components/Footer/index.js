import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const Footer = ({ count }) => <p>Voce tem {count} favoritos</p>

Footer.propTypes = {
  count: propTypes.number.isRequired,
}

const mapStateToProps = state => ({
  count: state.favorites.data.length, 
});

export default connect(mapStateToProps)(Footer);