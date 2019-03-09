/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import './config/Reactotron';

// import {StyleSheet} from 'react-native';
import CreateNavigator from './routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogin: false,
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@username');

    this.setState({
      userChecked: true,
      userLogin: !!username,
    })
  }

  render() {
    const {userChecked, userLogin} = this.state;

    if(!userChecked) return null;

    const Routes = CreateNavigator(userLogin);

    return (
      <Routes />
    );
  }
}

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
