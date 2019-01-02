import { ADD_SUBGOAL, MOVE_SUBGOAL } from '../constants/actionTypes.js';

export function addSubgoal(name, goalId) {
	return {
		type: ADD_SUBGOAL,
		name: name,
		goalId: goalId
	};
}

export function moveSubgoal(rootId, srcIndex, dstIndex) {
	return {
		type: MOVE_SUBGOAL,
		rootId: rootId,
		srcIndex: srcIndex,
		dstIndex: dstIndex
	};
}

