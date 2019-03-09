import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import api from "../../services/api";
import RepoItem from "./components/RepoItem";

export default class Home extends Component {
  state = {
    repoInput: "",
    error: "",
    loadingButton: false,
    loadingList: false,
    refreshing: false,
    repositories: []
  };

  static navigationOptions = {
    title: "GitIssues"
  };

  componentDidMount() {
    this.loadRepos();
  }

  loadRepos = async () => {
    this.setState({ refreshing: true });

    const repositories = JSON.parse(await AsyncStorage.getItem('@repos'));

    this.setState({ repositories: repositories || [], loadingList: false, refreshing: false });
  }

  addRepo = async () => {
    const { repoInput, repositories, loadingList } = this.state;

    if (loadingList) return;

    this.setState({ loadingButton: true });

    if (!repoInput) {
      this.setState({
        error: "Preencha o repositório para continuar",
        loadingButton: false
      });
      return;
    }

    if (
      repositories.find(repository => repository.full_name === repoInput)
    ) {
      this.setState({ error: "Repositório duplicado", loadingButton: false });
      return;
    }

    try {
      const { data } = await api.get(`/repos/${repoInput}`);

      this.setState({
        repoInput: "",
        repositories: [...repositories, data],
        error: ""
      });

      await AsyncStorage.setItem(
        "@repos",
        JSON.stringify([...repositories, data])
      );
    } catch (err) {
      this.setState({
        error: "Repo not found",
        repoInput: ""
      });
    } finally {
      this.setState({
        loadingButton: false
      });
    }
  };

  renderListItem = ({item}) => (
    <RepoItem repository={item}/>
  );

  renderList = () => {
    const { refreshing, repositories } = this.state;
    return !repositories.length ? (
      <Text style={styles.empty}>Nenhum repositório adicionado</Text>
    ) : (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepos}
        refreshing={refreshing}
        style={styles.listContainer}
      />
    );
  };

  render() {
    const { repoInput, loadingButton, loadingList, error } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Adicionar novo repositório"
              style={styles.formInput}
              placeholderTextColor={styles.placeholderColor.color}
              value={repoInput}
              onChangeText={text => this.setState({ repoInput: text })}
            />
            <TouchableOpacity onPress={this.addRepo}>
              {loadingButton ? (
                <ActivityIndicator size="small" style={styles.formLoading} />
              ) : (
                <Icon name="plus" size={20} style={styles.formIcon} />
              )}
            </TouchableOpacity>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
        {loadingList ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
