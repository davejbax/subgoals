import React from 'react';
import { connect } from 'react-redux';
import { DIALOG_TYPE_CONFIRM, DIALOG_TYPE_INFO, closeDialog } from '../ducks/dialog.js';
import InfoDialog from '../components/dialog/InfoDialog.js';
import ConfirmDialog from '../components/dialog/ConfirmDialog.js';

const GlobalDialog = (props) => {
  if (props.type === DIALOG_TYPE_CONFIRM) {
    return <ConfirmDialog {...props} />;
  } else if (props.type === DIALOG_TYPE_INFO) {
    return <InfoDialog {...props} />;
  } else {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    type: state.dialog.type,
    text: state.dialog.message,
    isOpen: state.dialog.isOpen,
    onAccept: state.dialog.onAccept,
    onReject: state.dialog.onReject
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => dispatch(closeDialog())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalDialog);