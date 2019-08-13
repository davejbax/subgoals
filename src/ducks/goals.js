import * as cloneDeep from 'lodash/cloneDeep';
import { findGoalById } from '../logic/goalSelectors.js';
import { breadthFirstSearch } from '../logic/trees.js';
import { createSelector } from 'reselect';

// Actions
const ADD_SUBGOAL = 'subgoals/goals/ADD_SUBGOAL';
const MOVE_SUBGOAL = 'subgoals/goals/MOVE_SUBGOAL';
const SET_GOAL_NAME = 'subgoals/goals/SET_GOAL_NAME';
const TOGGLE_GOAL_COMPLETE = 'subgoals/goals/TOGGLE_GOAL_COMPLETE';
const DELETE_GOAL = 'subgoals/goals/DELETE_GOAL';

// Reducer
const INITIAL_STATE = {
  goals: [
    {
      id: 0,
      name: 'Getting fit',
      color: 'salmon',
      subgoals: [
        {
          id: 2,
          name: 'Memes',
          completed: false,
          points: 0,
          daily: false,
          subgoals: [
            {
              id: 3,
              name: 'Nesting',
              completed: true,
              points: 0,
              daily: false,
              subgoals: []
            },
            {
              id: 4,
              name: 'This is a goal with a particularly long name, created for the purpose of demonstrating multiline functionality whereby multiple lines of text can be displayed in a single element!',
              completed: true,
              points: 0,
              daily: false,
              subgoals: []
            }
          ]
        }
      ],
      completed: false,
      points: 0,
      daily: false
    },
    {
      id: 1,
      name: 'Reading',
      color: 'aquamarine',
      subgoals: [],
      completed: false,
      points: 0,
      daily: false
    }
  ],
  nextId: 5
};

function applyAddSubgoal(state, action) {
  const newState = cloneDeep(state);
  const subgoal = findGoalById(newState.goals, action.goalId);

  if (subgoal != null) {
    subgoal.subgoals.push({
      id: newState.nextId,
      name: action.name,
      subgoals: [],
      completed: false,
      daily: false,
      points: 0
    });
    newState.nextId++;
  }

  // // Update the selected goal because it will reference an outdated
  // // goal (i.e. one belonging to the old state, which has been deep copied)
  // newState.selectedGoal = breadthFirstSearch(
  //   { subgoals: newState.goals },
  //   (goal) => newState.selectedGoalId === goal.id,
  //   (goal) => goal.subgoals
  // );

  return newState;
}

function applyMoveSubgoal(state, action) {
  if (!action.dst)
    return state;

  // Clone state so we don't mutate it or reuse refs
  const newState = cloneDeep(state);

  // Find the parents in question (we're moving an item from one parent to another)
  const srcParent = findGoalById(newState.goals, action.src.parentId);
  const dstParent = findGoalById(newState.goals, action.dst.parentId);

  // Get the destination index: if it's NaN, that means we're at the last index
  const dstIndex = isNaN(action.dst.index) ? dstParent.subgoals.length : action.dst.index;

  // Find the goal we're moving, remove it from the source parent, and insert it into the
  // destination parent at the desired position
  const goal = srcParent.subgoals.splice(action.src.index, 1)[0];
  dstParent.subgoals.splice(dstIndex, 0, goal);

  return newState;
}

function applyDeleteGoal(state, action) {
  const newState = cloneDeep(state);

  // Find the parent
  const parent = breadthFirstSearch(
    { subgoals: newState.goals },
    goal => goal.subgoals.findIndex(sg => sg.id === action.goalId) !== -1,
    goal => goal.subgoals
  );

  // If we couldn't find a parent, don't do anything
  if (!parent) {
    return state;
  }

  // Get index of goal in parent
  const goalIndex = parent.subgoals.findIndex(sg => sg.id === action.goalId);

  // Remove from parent
  parent.subgoals.splice(goalIndex, 1);

  return newState;
}

function mutateGoal(state, goalId, callback) {
  // Clone state and find goal object by given ID
  const newState = cloneDeep(state);
  const goal = findGoalById(newState.goals, goalId);

  // Execute callback to update whatever property of the goal
  callback(goal);

  // Return new state, which contains the modified goal object
  return newState;
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_SUBGOAL: return applyAddSubgoal(state, action);
    case MOVE_SUBGOAL: return applyMoveSubgoal(state, action);
    case SET_GOAL_NAME:
      return mutateGoal(
        state,
        action.goalId,
        goal => goal.name = action.name
      );
    case TOGGLE_GOAL_COMPLETE:
      return mutateGoal(
        state,
        action.goalId,
        goal => goal.completed = !goal.completed
      );
    case DELETE_GOAL: return applyDeleteGoal(state, action); 
    default: return state;
  }
}

// Action creators
/**
 * Creates a new subgoal and adds it to a (selected) goal. This will be
 * a top-level subgoal (i.e. not nested).
 * 
 * @param {string} name Name of subgoal
 * @param {number} goalId ID of goal to add subgoal to
 */
export function addSubgoal(name, goalId) {
  return {
    type: ADD_SUBGOAL,
    name: name,
    goalId: goalId
  };
}

/**
 * Moves a subgoal from one position to another in the selected goal.
 * 
 * @param {{parentId: number, index: number}} src Subgoal position before move
 * @param {{parentId: number, index: number}} dst Subgoal position after move
 */
export function moveSubgoal(src, dst) {
  return {
    type: MOVE_SUBGOAL,
    src: src,
    dst: dst
  };
}

// TODO: change to setGoalTitle/setGoalName
/**
 * Sets a (sub?)goal's name
 * 
 * @param {number} goalId ID of goal for which to change name
 * @param {string} name New goal name
 */
export function setGoalName(goalId, name) {
  return {
    type: SET_GOAL_NAME,
    goalId: goalId,
    name: name
  }
}

/**
 * Toggles whether or not a goal is complete
 * @param {number} goalId ID of goal to toggle completeness of
 */
export function toggleGoalComplete(goalId) {
  return {
    type: TOGGLE_GOAL_COMPLETE,
    goalId: goalId
  };
}

/**
 * Deletes a goal entirely
 * @param {number} goalId ID of goal to delete
 */
export function deleteGoal(goalId) {
  return {
    type: DELETE_GOAL,
    goalId: goalId
  };
}

// Selectors
export const getGoalsWithCompleteness = createSelector(
  [state => state.goals.goals],
  (goals) => {
    const newGoals = cloneDeep(goals);
    const markCompletedImplicit = (goal) => {
      // If there are children, we must go through them all and determine
      // whether they are completed. If they are all completed (either explicit
      // or implicit), we can mark this parent as implicitly completed.
      if (goal.subgoals.length > 0) {
        // Set the completed property to false, as we are not a leaf and so it
        // does not apply
        goal.completed = false;

        // Recursively check whether all subgoals are complete
        let allSubgoalsCompleted = true;
        for (let subgoal of goal.subgoals) {
          if (!markCompletedImplicit(subgoal)) {
            allSubgoalsCompleted = false;
          }
        }

        // If all subgoals are completed (and they will now have been marked
        // recursively as implicitly complete where appropriate), then we are
        // implicitly completed and should add this property. Otherwise, return
        // false.
        if (allSubgoalsCompleted) {
          goal.completedImplicit = true;
          return true;
        } else {
          return false;
        }
      } else {
        return goal.completed;
      }
    }

    // Go through each root goal and carry out the implicit completeness marking
    for (let goal of newGoals) {
      markCompletedImplicit(goal);
    }

    // Return this new list of goals, which is a clone of the old list, with all
    // goals that are implicitly complete (i.e. all children either leaves that 
    // are completed, or inodes that are implicilty complete) containing a new
    // property, 'completedImplicit', which is set to true.
    // All goals that have children have completed set to false, since they
    // cannot be explicitly completed.
    return newGoals;
  }
)