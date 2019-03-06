/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import Post from './components/Post';

export default class App extends Component {

  state = {
    posts: [
      {
        id: 1,
        title: 'Só os loucos sabem',
        author: 'Chorão sk8 skr skr',
        text: 'Agora eu sei exatamente o que fazer, vou recomeçar, poder contar outra vez, pois eu me lembro de tudo irmão...',
      },
      {
        id: 2,
        title: 'Mas ela vai voltar',
        author: 'Chorão sk8 skr skr',
        text: 'Ela não é do tipo de mulher que se entrega de primeira, se apaixona na segunda e perde a linha na terceira',
      },
      {
        id: 3,
        title: 'Eu amo Vinicius',
        author: 'Miriane',
        text: 'Eu amo muitão o meu bb e quero ele comigo pra sempre s2',
      }
    ]
  }

  render() {
    const {posts} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            GoNative app
          </Text>
        </View>

        <ScrollView>
          {posts.map(post => <Post key={post.id} data={post} />)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6666',
  },

  header: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    paddingTop: 20,
  },

  headerTitle: {
    marginTop: 20,
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
