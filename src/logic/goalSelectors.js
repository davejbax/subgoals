import { breadthFirstSearch, depthFirstSearch } from './trees.js';

export function findGoalById(goals, id) {
	return breadthFirstSearch(
		{ subgoals: goals },
		(goal) => id === goal.id,
		(goal) => goal.subgoals
	);
}

export function findGoalByIndex(goals, index) {
	let i = -1;
	return depthFirstSearch(
		{ subgoals: goals },
		(goal) => (++i) === index,
		(goal) => goal.subgoals
	);
}

export function getGoalIndex(goals, id) {
	let i = -1;
	const success = depthFirstSearch(
		{ subgoals: goals },
		(goal) => { i++; return id === goal.id },
		(goal) => goal.subgoals
	);
	return success ? i : -1;
}

export function getFlattenedGoals(goals) {
	let flattened = [];
	let stack = goals.slice();
	stack.reverse();

	while (stack.length > 0) {
		let head = stack.pop();

		// Add goal to flattened list
		flattened.push(head);

		// Stack goal children, with the first child at the head of the stack
		let children = head.subgoals.slice();
		children.reverse();
		stack = stack.concat(children);
	}

	// Return flattened list
	return flattened;
}