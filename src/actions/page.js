import { SET_SELECTED_GOAL, GO_BACK } from '../constants/actionTypes.js';

function setSelectedGoal(goal) {
	return {
		type: SET_SELECTED_GOAL,
		goal: goal
	};
}

function goBack() {
	return {
		type: GO_BACK
	};
}

export {
	setSelectedGoal,
	goBack
}