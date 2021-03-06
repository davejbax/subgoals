import md5 from 'blueimp-md5';

/**
 * Calculates the progress of a goal as a floating point number from
 * 0 to 1.
 * 
 * @param {Goal} goal Goal object for which to calculate progress of completion
 */
export function calculateGoalProgress(goal) {
  if (isGoalCompleted(goal))
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
  if (goal.color) {
    return goal.color;
  }

  const NUM_COLORS = getNumGoalColors();

  // Compute simple hash from goal name
  let hash = md5(goal.name);
  let index = 0;
  for (let i = 0; i < 32; i++) {
    index = (16 * index + parseInt(hash[i], 16)) % NUM_COLORS;
  }

  return `color-${index}`;
}

export function getNumGoalColors() {
  // TODO: get this constant to sync with CSS somehow...?
  return 32;
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
export function isGoalCompleted(goal) {
  return goal.completed === true || goal.completedImplicit === true;
}

export function isDailyGoal(goal) {
  return goal.daily !== false;
}

export function isAllowedChildren(goal) {
  return !isDailyGoal(goal);
}

export function isActiveDailyGoal(goal) {
  if (!isDailyGoal(goal) || goal.completed)
    return false;

  return true;
}