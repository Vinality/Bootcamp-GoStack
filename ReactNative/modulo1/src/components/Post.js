import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import propTypes from 'prop-types';

const Post = ({data}) => (
  <View style={styles.container}>
    <View style={styles.postHeader}>
      <Text style={styles.title}>
        {data.title}
      </Text>
      <Text style={styles.author}>
        {data.author}
      </Text>
    </View>
    <Text style={styles.content}>
      {data.text}
    </Text>
  </View>
);

Post.propTypes = {
  data: propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    author: propTypes.string,
    text: propTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  author: {
    padding: 5,
    fontSize: 12,
    color: '#333',
  },
});

export default Post;
