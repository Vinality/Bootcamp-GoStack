import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "./styles";
import propTypes from 'prop-types'

const RepoItem = ({ repository, navigation: { navigate } }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() =>
      navigate("Issues", {
        title: repository.name,
        full_name: repository.full_name
      })
    }
  >
    <Image
      style={styles.avatar}
      source={{ uri: repository.owner.avatar_url }}
    />
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{repository.name}</Text>
      <Text style={styles.author}>{repository.owner.login}</Text>
    </View>
    <Icon style={styles.icon} name="chevron-right" size={16} />
  </TouchableOpacity>
);

RepoItem.propTypes = {
  repository: propTypes.shape({
    name: propTypes.string,
    owner: propTypes.shape({
      login: propTypes.string,
      avatar_url: propTypes.string
    })
  }).isRequired,
  navigation: propTypes.shape({
    navigate: propTypes.func
  }).isRequired
};

export default withNavigation(RepoItem);
