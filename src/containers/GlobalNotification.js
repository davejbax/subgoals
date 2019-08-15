import { connect } from 'react-redux';
import { NotificationStack } from 'react-notification';
import { dismissNotification } from '../ducks/notifications';

const mapStateToProps = (state, ownProps) => {
  return {
    notifications: state.notifications.notifications
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDismiss: (notification) => {
      console.log('dismissing: ' + notification.key);
      dispatch(dismissNotification(notification.key));
    }
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,

    // We need to inject click handlers into the notification objects as given
    // in the state. There are probably better ways to do this (e.g. wrap the
    // NotificationStack component in another, and then just access the
    // onDismiss function from props), but this way is more fun.
    notifications: stateProps.notifications.map(notification => {
      return {
        ...notification,
        onClick: (notification, deactivate) => {
          deactivate();
          console.log(notification);
          dispatchProps.onDismiss(notification);
        }
      }
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NotificationStack);