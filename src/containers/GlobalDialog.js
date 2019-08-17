import React from 'react';
import { connect } from 'react-redux';
import { DIALOG_TYPE_CONFIRM, DIALOG_TYPE_INFO, DIALOG_TYPE_INPUT, closeDialog, DIALOG_TYPE_COLORPICKER } from '../ducks/dialog.js';
import InfoDialog from '../components/dialog/InfoDialog.js';
import ConfirmDialog from '../components/dialog/ConfirmDialog.js';
import InputDialog from '../components/dialog/InputDialog.js';
import ColorPickerDialog from '../components/dialog/ColorPickerDialog.js';

const GlobalDialog = (props) => {
  if (props.type === DIALOG_TYPE_CONFIRM) {
    return <ConfirmDialog {...props} />;
  } else if (props.type === DIALOG_TYPE_INFO) {
    return <InfoDialog {...props} />;
  } else if (props.type === DIALOG_TYPE_INPUT) {
    return <InputDialog {...props} />;
  } else if (props.type === DIALOG_TYPE_COLORPICKER) {
    return <ColorPickerDialog {...props} />;
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
    onReject: state.dialog.onReject,
    value: state.dialog.value
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