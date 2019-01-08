import {
	SET_SELECTED_GOAL,
	GO_BACK
} from '../constants/actionTypes.js';

export const setSelectedGoal = (goal) => (
	{
		type: SET_SELECTED_GOAL,
		goal: goal
	}
);

export const goBack = () => (
	{
		type: GO_BACK
	}
);