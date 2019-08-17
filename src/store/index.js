import { createStore, combineReducers, applyMiddleware } from 'redux';
import { save, load } from 'redux-localstorage-simple';
import * as reducers from '../ducks/index.js';

const root = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(
  save(['goals', 'page'])
)(createStore);
const store = createStoreWithMiddleware(
  root,
  load() // Preload state
);

export default store;