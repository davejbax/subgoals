import * as cloneDeep from 'lodash/cloneDeep';

import { ADD_SUBGOAL, MOVE_SUBGOAL } from '../actions/types.js';
import { breadthFirstSearch } from '../logic/trees.js';
import { findGoalById } from '../logic/goalSelectors.js';

// TODO: update goals to be loaded from a data store
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

  // Update the selected goal because it will reference an outdated
  // goal (i.e. one belonging to the old state, which has been deep copied)
  newState.selectedGoal = breadthFirstSearch(
    { subgoals: newState.goals },
    (goal) => newState.selectedGoalId === goal.id,
    (goal) => goal.subgoals
  );

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

function goalsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_SUBGOAL: return applyAddSubgoal(state, action);
    case MOVE_SUBGOAL: return applyMoveSubgoal(state, action);
    default: return state;
  }
}

export default goalsReducer;