import { ADD_SUBGOAL, MOVE_SUBGOAL } from '../constants/actionTypes.js';

export function addSubgoal(name, goalId) {
	return {
		type: ADD_SUBGOAL,
		name: name,
		goalId: goalId
	};
}

export function moveSubgoal(src, dst) {
	return {
		type: MOVE_SUBGOAL,
		src: src,
		dst: dst
	};
}

