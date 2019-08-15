// Actions
const SHOW_NOTIFICATION = 'subgoals/notifications/SHOW_NOTIFICATION';
const DISMISS_NOTIFICATION = 'subgoals/notifications/DISMISS_NOTIFICATION';

// Reducer
const INITIAL_STATE = {
  notifications: [
  ]
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION: {
      const notifications = [...state.notifications];
      notifications.push({
        message: action.message,
        key: action.key,
        action: action.action,
        dismissAfter: action.dismissAfter
      });

      return {
        ...state,
        notifications
      };
    }
    
    case DISMISS_NOTIFICATION: {
      const notifications = [...state.notifications];
      const index = notifications.findIndex(n => n.key === action.key);
      if (index > -1) {
        notifications.splice(index, 1);
      }

      return {
        ...state,
        notifications
      };
    }

    default:
      return state;
  }
}

// Action creators
export function showNotification(key, message, action, dismissAfter) {
  return {
    type: SHOW_NOTIFICATION,
    message,
    key,
    action,
    dismissAfter
  };
}

export function dismissNotification(key) {
  return {
    type: DISMISS_NOTIFICATION,
    key
  };
}