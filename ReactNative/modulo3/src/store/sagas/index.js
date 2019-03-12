import { all, takeLatest, call, put, select } from "redux-saga/effects";
import api from "../../services/api";
import { navigate } from "../../services/navigation";

import { Creators as LoginAction, Types as LoginTypes } from "../ducks/login";
import { Creators as RepoAction, Types as RepoTypes } from "../ducks/repositories";

function* login(action) {
  try {
    const { username } = action.payload;
    yield call(api.get, `/users/${username}`);
    yield put(LoginAction.loginSuccess(username));

    navigate("Repositories");
  } catch (error) {
    yield put(LoginAction.loginFailed());
  }
}

function* loadRepos() {
  try {
    const { username } = yield select(state => state.login);

    const response = yield call(api.get, `/users/${username}/repos`);

    yield put(RepoAction.repoLoadSuccess(response.data));
  } catch (error) {
    yield put(RepoAction.repoLoadFailed());
  }
}

export default function* rootSaga() {
  return yield all([
    takeLatest(LoginTypes.request, login),
    takeLatest(RepoTypes.request, loadRepos)
  ]);
}
