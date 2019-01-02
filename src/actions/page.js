import {
	SET_SELECTED_GOAL,
	GO_BACK,
	CHANGE_NEW_SUBGOAL_DEPTH
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

export const changeNewSubgoalDepth = (delta) => (
	{
		type: CHANGE_NEW_SUBGOAL_DEPTH,
		delta: delta
	}
);