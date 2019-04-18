/**
 * Calculates the progress of a goal as a floating point number from
 * 0 to 1.
 * 
 * @param {Goal} goal Goal object for which to calculate progress of completion
 */
function calculateGoalProgress(goal) {
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

export { calculateGoalProgress };