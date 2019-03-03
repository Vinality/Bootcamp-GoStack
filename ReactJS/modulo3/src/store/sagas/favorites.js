import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as FavoriteActions } from '../ducks/favorites';

export function* addFavorite (action) {
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repo}`);

    const isDuplicated = yield select(state => state.favorites.data.find(favorite => favorite.id === data.id));

    if(isDuplicated){
      yield put(FavoriteActions.addFavoriteFailure('Duplicated repo'));
    } else {
      const repoData = {
        id: data.id,
        title: data.full_name,
        description: data.description,
        url: data.html_url,
      };

      yield put(FavoriteActions.addFavoriteSuccess(repoData))
    }
  } catch (error) {
    yield put(FavoriteActions.addFavoriteFailure('Invalid repo'));
  }
}