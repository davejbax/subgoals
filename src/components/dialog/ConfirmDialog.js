import React from 'react';
import Dialog from './Dialog.js';

import './ConfirmDialog.scss';

const ConfirmDialog = (props) => {
  const { text, ...others } = props;
  return (
    <Dialog {...others}>
      <header>
        <h3>Are you sure?</h3>
        <button onClick={props.onClose}><i className="fas fa-times"></i></button>
      </header>
      <section>
        <p>{ props.text }</p>
        <div className="buttons">
          <button
            className="button button--primary"
            onClick={() => {props.onClose(); props.onAccept();}}
          >
            Yes
          </button>
          <button
            className="button"
            onClick={() => {props.onClose(); props.onReject();}}
          >
            No
          </button>
        </div>
      </section>
    </Dialog>
  );
}

export default ConfirmDialog;