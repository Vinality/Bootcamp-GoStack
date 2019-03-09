/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage, ActivityIndicator} from 'react-native';
import propTypes from 'prop-types';
import styles from './styles';
import api from '../../services/api'

export default class Welcome extends Component {
  static propTypes = {
    navigation: propTypes.shape({
      navigate: propTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    error: false,
  };

  getUser = async username => {
    const user = await api.get(`/users/${username}`);

    return user;
  };

  setUser = async username => {
    await AsyncStorage.setItem('@username', username);
  };

  signIn = async () => {
    const {username} = this.state;
    const {navigation} = this.props;

    this.setState({loading: true});

    try {
      await this.getUser(username);
      await this.setUser(username);
      navigation.navigate('User');
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const {username, loading, error} = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.text}>Please inform your GitHub username</Text>

        {error && <Text style={styles.error}>User not found.</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Username'
            underlineColorAndroid='transparent'
            value={username}
            onChangeText={text => this.setState({username: text})}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.signIn}>
            {loading ? <ActivityIndicator size='small' color='#FFF' /> : <Text style={styles.buttonText}>Go!</Text>}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
