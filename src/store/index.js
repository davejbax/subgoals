import { createStore, combineReducers } from 'redux';
import * as reducers from '../ducks/index.js';

const root = combineReducers(reducers);
const store = createStore(root);

export default store;