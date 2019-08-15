/**
 * Calculates the progress of a goal as a floating point number from
 * 0 to 1.
 * 
 * @param {Goal} goal Goal object for which to calculate progress of completion
 */
export function calculateGoalProgress(goal) {
  if (goal.completed)
    return 1;
  else if (goal.subgoals.length === 0)
    return 0;
  else
    return goal.subgoals.reduce(
      (acc, cur) => acc + calculateGoalProgress(cur),
      0
    ) / goal.subgoals.length;
}

/**
 * Computes a unique color based on the goal, returning a color category in the
 * form of a string like 'color-X', where X is a number between 0 and 31 inc.,
 * corresponding to the goal's unique color.
 * 
 * @param {Goal} goal Goal for which to compute color
 */
export function getGoalColor(goal) {
  const NUM_COLORS = 32;

  // Compute simple hash from goal name
  let hash = 0;
  for (let i = 0; i < goal.name.length; i++) {
    hash = hash * 31 + goal.name.charCodeAt(i);
  }

  // Take hash mod number of colors, and return appropriate color string
  hash %= NUM_COLORS;
  return `color-${hash}`;
}

/**
 * Checks whether a goal is a leaf node, returning true if this is the case.
 * A leaf node is a goal with no children/subgoals.
 * 
 * @param {Goal} goal 
 */
export function isLeafNode(goal) {
  return goal.subgoals.length === 0;
}

/**
 * Checks whether a goal is **explicitly** or **implicitly** complete: if a goal
 * is marked as complete by the user, it is explicitly complete. If a goal is
 * logically complete per the rules of implicit goal completeness, then it is
 * implicitly complete.
 * 
 * A goal is explicitly complete if and only if a user has marked it as complete
 * AND the goal is a leaf node.
 * 
 * A goal is implicitly complete if and only if ALL of its children are either
 * explicitly or implicitly complete.
 * 
 * That is, leaf nodes may only be explicitly complete; inodes may only be
 * implicitly complete.
 * 
 * @param {Goal} goal Goal to check completeness of
 */
export function isGoalComplete(goal) {
  // If the goal is completed, return true
  if (goal.completed === true && goal.subgoals.length === 0)
    return true;

  // If all of the goal's children are completed, return true
  if (goal.subgoals.length > 0) {
    for (let subgoal of goal.subgoals) {
      if (!isGoalComplete(subgoal))
        return false;
    }
    
    // We didn't encounter an incomplete subgoal, so we are therefore complete
    return true;
  }

  // If none of the criteria are met, then we are incomplete
  return false;
}

export function isAllowedChildren(goal) {
  return goal.daily === false;
}