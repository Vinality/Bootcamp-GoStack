/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  AsyncStorage,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import propTypes from 'prop-types';
import styles from './styles';
import base64 from 'react-native-base64';
import api from '../../services/api';
import Markdown from 'react-native-markdown-renderer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

class Readme extends Component {
  state = {
    content: '',
  };

  static propTypes = {
    navigation: propTypes.shape({
      getParam: propTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    name: navigation.getParam('name'),
  });

  async componentDidMount() {
    this.loadReadme();
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.navigate('Repositories');
  }

  loadReadme = async () => {
    const repoName = this.props.navigation.getParam('name');
    const username = await AsyncStorage.getItem('@username');
    const response = await api.get(`/repos/${username}/${repoName}/readme`);
    const content = base64.decode(response.data.content);

    this.setState({ content });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StatusBar barStyle="dark-content" />

          <TouchableOpacity onPress={this.goBack} style={styles.button}>
            <Icon name="angle-left" size={16} style={styles.icon} />
          </TouchableOpacity>
          {/* <View style={styles.right} /> */}
          <View style={styles.headerTitle}>
            <Text>README.md</Text>
          </View>
        </View>

        <ScrollView style={styles.container}>
          <Markdown style={styles.md}>{this.state.content}</Markdown>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(Readme);
