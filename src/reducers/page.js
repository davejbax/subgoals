import * as Actions from '../constants/actionTypes.js';

const INITIAL_STATE = {
	title: 'Subgoals',
	selectedGoalId: null
};

function applySetSelectedGoal(state, action) {
	var newState = Object.assign({}, state);
	newState.selectedGoalId = action.goal.id;
	newState.title = action.goal != null ? action.goal.name : INITIAL_STATE.title;
	return newState;
}

function applyGoBack(state, action) {
	// Do nothing if we can't go back
	if (state.selectedGoalId == null)
		return state;

	var newState = Object.assign({}, state);
	newState.title = 'Subgoals';
	newState.selectedGoalId = null;
	return newState;
}

function pageReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case Actions.SET_SELECTED_GOAL: return applySetSelectedGoal(state, action);
		case Actions.GO_BACK: return applyGoBack(state, action);
		default: return state;
	}
}

export default pageReducer;