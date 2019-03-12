import React, { Component } from 'react';

import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import { Creators as RepoActions } from '../../store/ducks/repositories';
import { ActivityIndicator, Text } from 'react-native';

import { Container } from './styles';

class Repositories extends Component {

  componentDidMount() {
    const { repoLoadRequest } = this.props

    repoLoadRequest();
  }

  render() {
   const { repos } = this.props;

    return (
      <Container>
        {repos.loading ? 
          <ActivityIndicator size='small' color='#999'/> 
          : repos.data.map(repo => <Text key={repo.id}>{repo.name}</Text>)}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.repositories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(RepoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
