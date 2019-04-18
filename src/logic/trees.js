/**
 * Performs a breadth first search on a tree-like object, returning the object if found,
 * and null otherwise.
 * 
 * @typeparam T Tree/node type
 * @param {T} tree The root node of the tree to search
 * @param {(node: T) => bool} isTarget A predicate to determine whether the target of
 *                  the search has been found.
 * @param {(node: T) => T[]} getChildren A function that retrieves the children (if any) of
 *                    a given node in the tree.
 * @returns Found object or null
 */
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

/**
 * Performs a depth first search on a tree-like object, returning the object if found,
 * and null otherwise.
 * 
 * @typeparam T Tree/node type
 * @param {T} tree The root node of the tree to search
 * @param {(node: T) => bool} isTarget A predicate to determine whether the target of
 *                  the search has been found.
 * @param {(node: T) => T[]} getChildren A function that retrieves the children (if any) of
 *                    a given node in the tree.
 * @returns Found object or null
 */
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