import { SET_SELECTED_GOAL, GO_BACK } from '../actions/types.js';

const INITIAL_STATE = {
  selectedGoalId: null
};

function applySetSelectedGoal(state, action) {
  var newState = Object.assign({}, state);
  newState.selectedGoalId = action.goalId;
  return newState;
}

function applyGoBack(state, action) {
  // Do nothing if we can't go back
  if (state.selectedGoalId == null)
    return state;

  var newState = Object.assign({}, state);
  newState.selectedGoalId = null;
  return newState;
}

function pageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_GOAL: return applySetSelectedGoal(state, action);
    case GO_BACK: return applyGoBack(state, action);
    default: return state;
  }
}

export default pageReducer;