import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import reducers from "./ducks";
import sagas from './sagas';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);

const createAppropriateStore = createStore;
// const createAppropriateStore = process.env.NODE_ENV === 'development' ? console.tron.createStore : createStore;

const store = createAppropriateStore(reducers, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(sagas);

export default store;
