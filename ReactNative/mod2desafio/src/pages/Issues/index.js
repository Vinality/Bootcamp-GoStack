import React, { Component } from "react";
import api from "../../services/api";
import { View, Text, ActivityIndicator } from "react-native";
import { FlatList, StatusBar } from "react-native-gesture-handler";
import IssueItem from "./components/IssueItem";
import Filter from "./components/Filter";

import styles from "./styles";

export default class Issues extends Component {
  state = {
    activeFilter: "all",
    issues: [],
    loading: true,
    error: "",
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  componentDidMount() {
    this.loadIssues();
  }

  changeFilter = async value => {
    this.setState({ activeFilter: value });

    const { navigation } = this.props;
    const fullName = navigation.getParam("full_name");

    try {
      const { data } = await api.get(
        `/repos/${fullName}/issues?state=${value}`
      );
      this.setState({ issues: data });
    } catch (err) {
      this.setState({ error: "Error getting issues" });
    }
  };

  loadIssues = async () => {
    this.setState({
      refreshing: true
    });

    const { navigation } = this.props;
    const { activeFilter } = this.state;

    try {
      const { data } = await api.get(
        `/repos/${navigation.getParam(
          "full_name"
        )}/issues?state=${activeFilter}`
      );
      this.setState({ issues: data });
    } catch (err) {
      this.setState({ error: "Error getting issues" });
    } finally {
      this.setState({ refreshing: false, loading: false });
    }
  };

  renderIssueItem = ({item}) => <IssueItem issue={item} />;

  renderList = () => {
    const { issues, refreshing } = this.state;
    console.tron.log(issues);
    return !issues.length ? (
      <Text style={styles.empty}>No issues</Text>
    ) : (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderIssueItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
        style={styles.listContainer}
      />
    );
  };

  render() {
    const { error, loading, activeFilter } = this.state;
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="dark-content" /> */}
        {!!error && <Text style={styles.error}>{error}</Text>}
        <Filter activeFilter={activeFilter} changeFilter={this.changeFilter} />
        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
