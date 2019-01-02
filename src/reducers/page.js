import * as Actions from '../constants/actionTypes.js';

const INITIAL_STATE = {
	title: 'Subgoals',
	selectedGoalId: null,
	newSubgoalDepth: 0
};

function applySetSelectedGoal(state, action) {
	var newState = Object.assign({}, state);
	newState.selectedGoalId = action.goal.id;
	newState.title = action.goal != null ? action.goal.name : INITIAL_STATE.title;
	newState.newSubgoalDepth = INITIAL_STATE.newSubgoalDepth;
	return newState;
}

function applyGoBack(state, action) {
	// Do nothing if we can't go back
	if (state.selectedGoalId == null)
		return state;

	var newState = Object.assign({}, state);
	newState.title = 'Subgoals';
	newState.selectedGoalId = null;
	newState.newSubgoalDepth = INITIAL_STATE.newSubgoalDepth;
	return newState;
}

function applyChangeNewSubgoalDepth(state, action) {
	const newState = Object.assign({}, state);
	newState.newSubgoalDepth += action.delta;
	if (newState.newSubgoalDepth < 0)
		newState.newSubgoalDepth = 0;
	
	return newState;
}

function pageReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case Actions.SET_SELECTED_GOAL: return applySetSelectedGoal(state, action);
		case Actions.GO_BACK: return applyGoBack(state, action);
		case Actions.CHANGE_NEW_SUBGOAL_DEPTH: return applyChangeNewSubgoalDepth(state, action);
		default: return state;
	}
}

export default pageReducer;