/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, AsyncStorage, ActivityIndicator, FlatList} from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import styles from './styles';
import RepositoryItem from './RepositoryItem'

export default class Repositories extends Component {
  state = {
    data: [],
    loading: true,
    refreshing: false,
  }

  async componentDidMount() {
    this.loadRepos();
  }

  loadRepos = async () => {
    this.setState({refreshing: true});

    const username = await AsyncStorage.getItem('@username');
    const response = await api.get(`/users/${username}/repos`);

    this.setState({ data: response.data, loading: false, refreshing: false });
  }

  renderListItem = ({item}) => (
    <RepositoryItem repository={item}/>
  );

  renderList = () => { 
    const {data, refreshing} = this.state;

    return (
      <FlatList 
        data={data} 
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepos}  
        refreshing={refreshing} 
      />
    );
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name='list-alt' size={20} color={tintColor} />,
  };

  render() {
    const {loading} = this.state;
    return(
      <View style={styles.container}>
        <Header title='Repositórios' />
        {loading ? <ActivityIndicator style={styles.loading}/> : this.renderList()}
      </View>
    );
  }
}
