import { combineReducers } from 'redux';

import goalsReducer from './goals.js';
import pageReducer from './page.js';

const rootReducer = combineReducers({
  goals: goalsReducer,
  page: pageReducer
});

export default rootReducer;