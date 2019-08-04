// Actions
const SET_SELECTED_GOAL = 'subgoals/page/SET_SELECTED_GOAL';
const GO_BACK = 'subgoals/page/GO_BACK';

// Reducer
const INITIAL_STATE = {
  selectedGoalId: null
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SELECTED_GOAL:
      return {
        ...state,
        selectedGoalId: action.goalId
      };

    case GO_BACK:
      return {
        ...state,
        selectedGoalId: null
      }
    default: return state;
  }
}

// Action creators

/**
 * Sets the selected goal. This will be displayed in a Goal Page,
 * allowing the user to see its subgoals, title, etc.
 * 
 * If the given ID is null, the user will be returned to the listing
 * of all goals (i.e. Main Page).
 * 
 * @param {number | null} goalId ID of the goal to select
 */
export function setSelectedGoal(goalId) {
  return {
    type: SET_SELECTED_GOAL,
    goalId: goalId
  };
}

/**
 * Navigates back in the navigation hierarchy.
 */
export function goBack() {
  return {
    type: GO_BACK
  };
}