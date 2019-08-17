// Actions
const OPEN_INFO_DIALOG = 'subgoals/dialog/OPEN_INFO_DIALOG';
const OPEN_CONFIRM_DIALOG = 'subgoals/dialog/OPEN_CONFIRM_DIALOG';
const OPEN_INPUT_DIALOG = 'subgoals/dialog/OPEN_INPUT_DIALOG';
const OPEN_COLORPICKER_DIALOG = 'subgoals/dialog/OPEN_COLORPICKER_DIALOG';
const CLOSE_DIALOG = 'subgoals/dialog/CLOSE_DIALOG';

// Constants
export const DIALOG_TYPE_INFO = 'info';
export const DIALOG_TYPE_INPUT = 'input';
export const DIALOG_TYPE_COLORPICKER = 'colorpicker';
export const DIALOG_TYPE_CONFIRM = 'confirm';

// Reducer
const INITIAL_STATE = {
  type: null,
  message: null,
  isOpen: false,

  onAccept: null,
  onReject: null
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case OPEN_INFO_DIALOG:
      return {
        ...state,
        type: DIALOG_TYPE_INFO,
        isOpen: true,
        message: action.message
      };
    case OPEN_CONFIRM_DIALOG:
      return {
        ...state,
        type: DIALOG_TYPE_CONFIRM,
        isOpen: true,
        message: action.message,
        onAccept: action.onAccept,
        onReject: action.onReject
      };
    case OPEN_INPUT_DIALOG:
      return {
        ...state,
        type: DIALOG_TYPE_INPUT,
        isOpen: true,
        message: action.message,
        onAccept: action.onAccept,
        onReject: action.onReject,
        value: action.value
      };
    case OPEN_COLORPICKER_DIALOG:
      return {
        ...state,
        type: DIALOG_TYPE_COLORPICKER,
        isOpen: true,
        message: action.message,
        onAccept: action.onAccept,
        onReject: action.onReject,
        value: action.value
      }
    case CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
}

// Action creators

/**
 * Opens an informational dialog box, displaying the given message
 * @param {string} message Message to display in info dialog
 */
export function openInfoDialog(message) {
  return {
    type: OPEN_INFO_DIALOG,
    message: message
  };
}

/**
 * Opens a confirmation dialog
 * @param {string} message Message to display in confirm dialog
 * @param {function} onAccept Callback to be invoked if user accepts (clicks OK)
 * @param {function} onReject Callback to be invoked if user rejects (clicks Cancel)
 */
export function openConfirmDialog(message, onAccept, onReject) {
  return {
    type: OPEN_CONFIRM_DIALOG,
    message,
    onAccept,
    onReject
  };
}

export function openInputDialog(message, onAccept, onReject, value = '') {
  return {
    type: OPEN_INPUT_DIALOG,
    message,
    onAccept,
    onReject,
    value
  };
}

/**
 * Opens a colorpicker dialog, allowing a user to choose from 32 hues (named
 * color-0 through color-31).
 * 
 * @param {string} message 
 * @param {function} onAccept 
 * @param {function} onReject
 * @param {string} value 
 */
export function openColorpickerDialog(message, onAccept, onReject, value = 'color-0') {
  return {
    type: OPEN_COLORPICKER_DIALOG,
    message,
    onAccept,
    onReject,
    value
  }
}

/**
 * Closes any open dialog
 */
export function closeDialog() {
  return {
    type: CLOSE_DIALOG
  };
}