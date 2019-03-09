import React from 'react';

import {View, Text, Image} from 'react-native';
import propTypes from 'prop-types';
import styles from './styles';

const OrganizationItem = ({organization}) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{uri: organization.avatar_url}}/>
    <Text style={styles.title}>{organization.login}</Text>
  </View>
);

OrganizationItem.propTypes = {
  organization: propTypes.shape({
    avatar_url: propTypes.string,
    login: propTypes.string,
  }).isRequired,
};

export default OrganizationItem;
