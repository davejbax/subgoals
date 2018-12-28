//https://www.robinwieruch.de/react-redux-tutorial/#redux-actions
import { createStore } from 'redux';
import root from '../reducers/root.js';

const store = createStore(root);

export default store;