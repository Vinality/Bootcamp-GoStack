import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { Creators as FavoriteActions } from '../../store/ducks/favorites';

class Main extends Component {
  static propTypes = {
    addFavoriteRequest: propTypes.func.isRequired,
    favorites: propTypes.shape({
      data: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        title: propTypes.string,
        description: propTypes.string,
        url: propTypes.string,
      })),
      error: propTypes.oneOfType([null, propTypes.string]),
      loading: propTypes.bool,
    }).isRequired
  }

  state = {
    repoInput: '',
  };

  handleAddRepo = (e) => {
    e.preventDefault();
    this.props.addFavoriteRequest(this.state.repoInput);

    this.setState({repoInput: ''});
  }
  
  render() {
    return(
      <Fragment>
        <form onSubmit={this.handleAddRepo}>
          <input placeholder="User/Repo" value={this.state.repoInput}
          onChange={e => this.setState({repoInput: e.target.value})} />
          <button type='submit'>Add</button>

          {this.props.favorites.loading && <span>Loading</span>}
          {!!this.props.favorites.error && <span>{this.props.favorites.error}</span>}
        </form>

        <ul>
          {this.props.favorites.data.map(favorite => (
            <li key={favorite.id}>
              <p>
                <strong>{favorite.title}</strong> ({favorite.description})
              </p>
              <a href={favorite.url}>Acessar</a>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
