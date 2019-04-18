import { SET_SELECTED_GOAL, GO_BACK } from './types.js';

/*
 * Action creators
 */

/**
 * Sets the selected goal. This will be displayed in a Goal Page,
 * allowing the user to see its subgoals, title, etc.
 * 
 * If the given ID is null, the user will be returned to the listing
 * of all goals (i.e. Main Page).
 * 
 * @param {number | null} goalId ID of the goal to select
 */
export const setSelectedGoal = (goalId) => (
  {
    type: SET_SELECTED_GOAL,
    goalId: goalId
  }
);

/**
 * Navigates back in the navigation hierarchy.
 */
export const goBack = () => (
  {
    type: GO_BACK
  }
);