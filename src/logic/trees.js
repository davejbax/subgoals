export function breadthFirstSearch(tree, isTarget, getChildren) {
	let queue = getChildren(tree).slice();
	while (queue.length > 0) {
		// Remove head of queue
		let subtree = queue.shift();

		// Check if we've found the target yet
		if (isTarget(subtree))
			return subtree;

		// Queue children
		queue = queue.concat(getChildren(subtree));
	}

	return null;
}

export function depthFirstSearch(tree, isTarget, getChildren) {
	let stack = getChildren(tree).slice();
	stack.reverse();

	while (stack.length > 0) {
		// Remove head of stack
		let subtree = stack.pop();

		// Check if we've found the target yet
		if (isTarget(subtree))
			return subtree;

		// Stack children
		let children = getChildren(subtree).slice();
		children.reverse();
		stack = stack.concat(children);
	}

	return null;
}