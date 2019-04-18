import React, { Component } from 'react';
import EditableSubgoalList from '../containers/EditableSubgoalList.js';

class PageGoal extends Component {
  render() {
    const goal = this.props.goal;

    return (
      <EditableSubgoalList goal={goal} />
    );
  }
}

export default PageGoal;