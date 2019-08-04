import * as cloneDeep from 'lodash/cloneDeep';
import { findGoalById } from '../logic/goalSelectors.js';

// Actions
const ADD_SUBGOAL = 'subgoals/goals/ADD_SUBGOAL';
const MOVE_SUBGOAL = 'subgoals/goals/MOVE_SUBGOAL';
const SET_SUBGOAL_TITLE = 'subgoals/goals/SET_SUBGOAL_TITLE';

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
    case SET_SUBGOAL_TITLE:
      return mutateGoal(
        state,
        action.subgoal.id,
        goal => goal.name = action.title
      ); /* TODO: change subgoal.id to goalId */
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
 * Sets a subgoal's title 
 * 
 * @param {Goal} subgoal Subgoal for which to change title/name
 * @param {string} title New title
 */
export function setSubgoalTitle(subgoal, title) {
  return {
    type: SET_SUBGOAL_TITLE,
    subgoal: subgoal,
    title: title
  }
}