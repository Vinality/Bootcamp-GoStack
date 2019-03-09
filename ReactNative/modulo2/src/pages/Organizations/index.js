/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import OrganizationItem from './OrganizationItem'
import styles from './styles';
import { View, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import api from '../../services/api';

export default class Organizations extends Component {
  state = {
    data: [],
    loading: true,
    refreshing: false,
  }

  async componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@username');
    const response = await api.get(`/users/${username}/orgs`);

    this.setState({ data: response.data, loading: false, refreshing: false });
  }

  renderListItem = ({ item }) => (
    <OrganizationItem organization={item} />
  );

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        refreshing={refreshing}
      />
    );
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name='list-alt' size={20} color={tintColor} />,
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title='Organizations' />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}


