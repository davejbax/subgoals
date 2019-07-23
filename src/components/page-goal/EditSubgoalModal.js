import React, { Component } from 'react';

import './EditSubgoalModal.scss';

class EditSubgoalModal extends Component {

  render() {
    const subgoal = this.props.subgoal;
    if (!subgoal) {
      // Sanity check
      return null;
    }

    return (
      <div>
        <h3>{subgoal.name}</h3>
        <p className="longer-desc">
        Enter a longer goal description here...
        </p>
      </div>
    );
  }

}

export default EditSubgoalModal;