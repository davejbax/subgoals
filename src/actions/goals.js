import { ADD_SUBGOAL, MOVE_SUBGOAL } from './types.js';

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

