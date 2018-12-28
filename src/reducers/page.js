const INITIAL_STATE = {
	title: 'Subgoals',
	selectedGoal: null
};

function applySetSelectedGoal(state, action) {
	var newState = Object.assign({}, state);
	newState.selectedGoal = action.goal;
	newState.title = action.goal != null ? action.goal.name : newState.title;
	return newState;
}

function applyGoBack(state, action) {
	// Do nothing if we can't go back
	if (state.selectedGoal == null)
		return state;

	var newState = Object.assign({}, state);
	newState.title = 'Subgoals';
	newState.selectedGoal = null;
	return newState;
}

function pageReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_SELECTED_GOAL': return applySetSelectedGoal(state, action);
		case 'GO_BACK': return applyGoBack(state, action);
		default: return state;
	}
}

export default pageReducer;