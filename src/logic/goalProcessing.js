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