import React from 'react';
import Dialog from './Dialog.js';

const InfoDialog = (props) => {
  return (
    <Dialog {...props}>
      <header>
        <h3>Information</h3>
        <button onClick={props.onClose}><i className="fas fa-times"></i></button>
      </header>
      <section>
        { props.text }
      </section>
    </Dialog>
  );
}

export default InfoDialog;