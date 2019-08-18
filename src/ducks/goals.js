import * as cloneDeep from 'lodash/cloneDeep';
import { findGoalById, flattenGoals } from '../logic/goalSelectors.js';
import { breadthFirstSearch } from '../logic/trees.js';
import { createSelector } from 'reselect';
import { TYPE_DEADLINE, TYPE_TARGET, TYPE_MANUAL } from '../logic/dailyGoals.js';
import { isActiveDailyGoal } from '../logic/goalProcessing.js';

// Actions
const CREATE_GOAL = 'subgoals/goals/CREATE_GOAL';
const ADD_SUBGOAL = 'subgoals/goals/ADD_SUBGOAL';
const MOVE_SUBGOAL = 'subgoals/goals/MOVE_SUBGOAL';
const SET_GOAL_NAME = 'subgoals/goals/SET_GOAL_NAME';
const SET_GOAL_COLOR = 'subgoals/goals/SET_GOAL_COLOR';
const TOGGLE_GOAL_COMPLETE = 'subgoals/goals/TOGGLE_GOAL_COMPLETE';
const DELETE_GOAL = 'subgoals/goals/DELETE_GOAL';
const ADD_TO_DAILY = 'subgoals/goals/ADD_TO_DAILY';
const REMOVE_FROM_DAILY = 'subgoals/goals/REMOVE_FROM_DAILY';
const REMOVE_LATEST_FROM_DAILY = 'subgoals/goals/REMOVE_LATEST_FROM_DAILY';
const SET_DAILY_TYPE = 'subgoals/goals/SET_DAILY_TYPE';
const CONFIGURE_DAILY_TYPE = 'subgoals/goals/CONFIGURE_DAILY_TYPE';
const TOGGLE_GOAL_DAILY = 'subgoal/goals/TOGGLE_GOAL_DAILY';

// Reducer
const INITIAL_STATE = {
  goals: [
    {
      id: 0,
      name: 'Welcome',
      color: 'color-1',
      subgoals: [
        {
          id: 1,
          name: 'All items in this list are \'subgoals\'',
          completed: false,
          daily: false,
          subgoals: []
        },
        {
          id: 10,
          name: 'Click on a subgoal to edit and view more information',
          completed: false,
          daily: false,
          subgoals: []
        },
        {
          id: 9,
          name: 'Completing subgoals',
          completed: false,
          daily: false,
          subgoals: [
            {
              id: 3,
              name: 'Tap in the top-left of a subgoal to toggle whether it is completed',
              completed: false,
              daily: false,
              subgoals: []
            },
            {
              id: 4,
              name: 'This is a completed subgoal',
              completed: true,
              daily: false,
              subgoals: []
            },
            {
              id: 5,
              name: 'When all subgoals directly beneath another item are completed, the item is also considered completed',
              completed: false,
              daily: false,
              subgoals: []
            },
            {
              id: 6,
              name: 'This subgoal has all its subgoals completed, and is therefore completed',
              completed: false,
              daily: false,
              subgoals: [
                {
                  id: 7,
                  name: 'Task 1',
                  completed: true,
                  daily: false,
                  subgoals: []
                },
                {
                  id: 8,
                  name: 'Task 2',
                  completed: true,
                  daily: false,
                  subgoals: []
                }
              ]
            }
          ]
        },
        {
          id: 11,
          name: 'Daily goals',
          completed: false,
          daily: false,
          subgoals: [
            {
              id: 12,
              name: 'Daily goals are goals that you intend to complete daily (or every few days)',
              completed: false,
              daily: false,
              subgoals: []
            },
            {
              id: 13,
              name: 'Click/tap on a daily goal to see its entire history and change settings',
              completed: false,
              daily: false,
              subgoals: []
            },
            {
              id: 14,
              name: 'This is a daily goal',
              completed: false,
              daily: {
                type: TYPE_MANUAL,
                typeConfig: null,
                history: []
              },
              subgoals: []
            }
          ]
        },
        {
          id: 15,
          name: 'You can delete this goal from the main page',
          completed: false,
          daily: false,
          subgoals: []
        }
      ],
      completed: false,
      daily: false
    }
  ],
  nextId: 16
};

function applyCreateGoal(state, action) {
  const newState = cloneDeep(state);

  newState.goals.push({
    id: newState.nextId,
    name: action.name,
    subgoals: [],
    completed: false,
    daily: false
  });
  newState.nextId++;

  return newState;
}

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

  // First check whether it is a simple case of deleting from top level
  const index = newState.goals.findIndex(goal => goal.id === action.goalId);
  if (index > -1) {
    newState.goals.splice(index, 1);
    return newState;
  }

  // Find the parent
  const parent = breadthFirstSearch(
    { subgoals: newState.goals },
    goal => goal.subgoals.findIndex(sg => sg.id === action.goalId) !== -1,
    goal => goal.subgoals
  );

  // If we couldn't find a parent, do nothing
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
    case CREATE_GOAL: return applyCreateGoal(state, action);
    case ADD_SUBGOAL: return applyAddSubgoal(state, action);
    case MOVE_SUBGOAL: return applyMoveSubgoal(state, action);
    case SET_GOAL_NAME:
      return mutateGoal(
        state,
        action.goalId,
        goal => goal.name = action.name
      );
    case SET_GOAL_COLOR:
      return mutateGoal(
        state,
        action.goalId,
        goal => goal.color = action.color
      );
    case TOGGLE_GOAL_COMPLETE:
      return mutateGoal(
        state,
        action.goalId,
        goal => goal.completed = !goal.completed
      );
    case DELETE_GOAL: return applyDeleteGoal(state, action); 
    case ADD_TO_DAILY:
      return mutateGoal(
        state,
        action.goalId,
        goal => {
          if (!goal.daily) {
            return;
          }

          goal.daily.history.push(action.timestamp);
        }
      );
    case REMOVE_FROM_DAILY:
      return mutateGoal(
        state,
        action.goalId,
        goal => {
          // If goal is not daily, ignore action
          if (!goal.daily) {
            return;
          }

          // Find timestamp and remove if it exists
          const index = goal.daily.history.indexOf(action.timestamp);
          if (index > -1) {
            goal.daily.history.splice(index, 1);
          }
        }
      )
    case REMOVE_LATEST_FROM_DAILY:
      return mutateGoal(
        state,
        action.goalId,
        goal => {
          const target = new Date(action.timestamp);
          const history = goal.daily.history
            .map(timestamp => new Date(timestamp))
            .filter(date => date.getFullYear() === target.getFullYear()
              && date.getMonth() === target.getMonth()
              && date.getDate() === target.getDate())
            .sort((a, b) => {
              if (a > b) return 1;
              else if (a < b) return -1;
              else return 0;
            })
            .reverse();
          
          // If we found a matching item in the history, remove the latest
          // one (the 'history' array is in sorted order by desc time)
          if (history.length > 0) {
            const latestTimestamp = history[0].toISOString();
            const index = goal.daily.history.indexOf(latestTimestamp);

            if (index > -1) {
              goal.daily.history.splice(index, 1);
            } else {
              console.warn('Inconsistency: could not find index of history timestamp');
            }
          }
        }
      );
    case SET_DAILY_TYPE:
      return mutateGoal(
        state,
        action.goalId,
        goal => {
          // Do nothing if we aren't changing type
          if (goal.daily.type === action.newType) {
            return goal;
          }

          // Set type
          goal.daily.type = action.newType;

          // Create default type config
          switch (goal.daily.type) {
            case TYPE_TARGET:
              // Default target: 10 times
              goal.daily.typeConfig = 10;
              break;
            case TYPE_DEADLINE:
              // Default deadline: 1 week from now
              const now = new Date();
              now.setDate(now.getDate() + 7);
              goal.daily.typeConfig = now.toISOString();
              break;
            default:
              goal.daily.typeConfig = null;
              break;
          }
        }
      );
    case CONFIGURE_DAILY_TYPE:
      return mutateGoal(
        state,
        action.goalId,
        goal => goal.daily.typeConfig = action.config
      );
    case TOGGLE_GOAL_DAILY:
      return mutateGoal(
        state,
        action.goalId,
        goal => {
          if (goal.daily) {
            goal.daily = false;
          } else {
            goal.daily = {
              type: TYPE_MANUAL,
              typeConfig: null,
              history: []
            }
          }
        }
      )
    default: return state;
  }
}

// Action creators
/**
 * Creates a new goal (i.e. NOT subgoal), initialized with default settings
 * @param {string} name Name of goal to create
 */
export function createGoal(name) {
  return {
    type: CREATE_GOAL,
    name: name
  };
}

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
 * Sets a goal's color explicitly (i.e. overrides generated color)
 * 
 * @param {number} goalId ID of goal
 * @param {string} color New color
 */
export function setGoalColor(goalId, color) {
  return {
    type: SET_GOAL_COLOR,
    goalId: goalId,
    color: color
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

/**
 * Adds a 'completion' of a daily goal to its history, i.e. marks a particular
 * date/time as completed on this date/time.
 * 
 * @param {number} goalId ID of goal
 * @param {string} timestamp ISO8601 timestamp of when the daily goal was done
 */
export function addToDaily(goalId, timestamp) {
  return {
    type: ADD_TO_DAILY,
    goalId: goalId,
    timestamp: timestamp
  };
}

/**
 * Removes a 'completion' of a daily goal from its history.
 * 
 * @param {number} goalId ID of goal
 * @param {string} timestamp ISO8601 timestamp of completion to delete
 */
export function removeFromDaily(goalId, timestamp) {
  return {
    type: REMOVE_FROM_DAILY,
    goalId: goalId,
    timestamp: timestamp
  }
}

/**
 * Removes the latest (i.e. last one in a given day/month/year) 'completion'
 * of a daily goal from its history.
 * 
 * The timestamp need not have a time different to 00:00; it is disregarded
 * entirely.
 * 
 * @param {number} goalId ID of goal
 * @param {string} timestamp ISO8601 timestamp; time is ignored, as the
 *                           the latest time from the day of the timestamp used
 */
export function removeLatestFromDaily(goalId, timestamp) {
  return {
    type: REMOVE_LATEST_FROM_DAILY,
    goalId: goalId,
    timestamp: timestamp
  }
}

/**
 * Sets the type of a daily goal. Any properties from the previous type of
 * the goal will be discarded, and the new properties shall be initialized
 * with default values.
 * 
 * @param {number} goalId ID of goal to change
 * @param {string} newType New daily goal type; see `logic/dailyGoals.js`
 */
export function setDailyType(goalId, newType) {
  return {
    type: SET_DAILY_TYPE,
    goalId: goalId,
    newType: newType
  }
}

/**
 * Sets the parameters for a daily goal's type. For instance, a target type
 * requires a configuration of the number (i.e. the target itself).
 * 
 * @param {number} goalId ID of goal to change
 * @param {any} config New configuration value for goal; can be any type
 */
export function configureDailyType(goalId, config) {
  return {
    type: CONFIGURE_DAILY_TYPE,
    goalId: goalId,
    config: config
  }
}

/**
 * Toggles whether or not a goal is a daily goal.
 * If the goal is daily, this will erase all associated daily data.
 * If the goal is not daily, this will initialize the goal with empty history and
 * a daily type of manual.
 * 
 * @param {number} goalId ID of goal
 */
export function toggleGoalDaily(goalId) {
  return {
    type: TOGGLE_GOAL_DAILY,
    goalId: goalId
  }
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

export const getActiveDailyGoals = createSelector(
  [state => state.goals.goals],
  (goals) => {
    return flattenGoals(goals).filter(
      goal => isActiveDailyGoal(goal)
    )
  }
)