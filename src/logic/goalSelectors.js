import { breadthFirstSearch, depthFirstSearch } from './trees.js';

/**
 * Finds a Goal object by its ID in a tree of goals
 * 
 * @param {Goal[]} goals Array of goals in tree structure
 * @param {number} id ID of goal
 */
export function findGoalById(goals, id) {
  return breadthFirstSearch(
    { subgoals: goals },
    (goal) => id === goal.id,
    (goal) => goal.subgoals
  );
}

/**
 * Finds a Goal object by its position/index in a tree of goals.
 * This position depends upon the Goal's position when the Goal
 * array is flattened out using a depth-first search, with lower
 * indices being visited before higher indices.
 * 
 * @param {Goal[]} goals Array of goals in tree structure
 * @param {number} index Index of goal to find
 */
export function findGoalByIndex(goals, index) {
  let i = -1;
  return depthFirstSearch(
    { subgoals: goals },
    (goal) => (++i) === index,
    (goal) => goal.subgoals
  );
}

/**
 * Flattens an array of Goals from a tree-like structure
 * into a single array of the same Goals, with all of the
 * Goals' children recursively added to the array. The Goal
 * objects in this final array will be the same as they were
 * in the tree-like structure, i.e. will still contain a list
 * of their own subgoals/children.
 * 
 * @param {Goal[]} goals Array of goals in tree structure
 */
export function flattenGoals(goals) {
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