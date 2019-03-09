/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text} from 'react-native';
import propTypes from 'prop-types';
import {withNavigation} from 'react-navigation';

import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

class RepositoryItem extends Component {

  static propTypes = {
    repository: propTypes.shape({
      name: propTypes.string,
      full_name: propTypes.string,
      stargazers_count: propTypes.number,
      forks_count: propTypes.number,
    }).isRequired,
    navigation: propTypes.shape({
      navigate: propTypes.func,
    }).isRequired,
  };

  render() {
    const {repository} = this.props;
    const {navigation} = this.props;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('Readme', { name: repository.name })}
      >

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {repository.full_name}
          </Text>
          <Icon style={styles.iconSeta} name="chevron-right" size={16} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Icon name='star' size={12} style={styles.infoIcon} />
            <Text style={styles.infoText}>{repository.stargazers_count}</Text>
          </View>

          <View style={styles.info}>
            <Icon name='code-fork' size={12} style={styles.infoIcon} />
            <Text style={styles.infoText}>{repository.forks_count}</Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(RepositoryItem);
