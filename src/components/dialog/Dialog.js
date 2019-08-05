import React from 'react';
import ReactModal from 'react-modal';

import './Dialog.scss';

const Dialog = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Dialog" // TODO
      onRequestClose={onClose}
      overlayClassName="dialog-overlay"
      className="dialog"
      closeTimeoutMS={200}
    >
      {children}
    </ReactModal>
  );
}

export default Dialog;