import React, { Component } from 'react';

import './EditSubgoalModal.scss';

class EditSubgoalModal extends Component {

  constructor(props) {
    super(props);

    this.handleInputTitle = this.handleInputTitle.bind(this);
    this.handleViewChildren = this.handleViewChildren.bind(this);
  }

  handlePasteAsPlainText(event) {
    event.preventDefault();

    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }

  handleInputTitle(event) {
    const newTitle = event.target.textContent;
    this.props.onChangeTitle(this.props.subgoal, newTitle);
  }

  handleViewChildren() {
    this.props.onRequestClose();
    this.props.onViewChildren(this.props.subgoal);
  }

  render() {
    const subgoal = this.props.subgoal;
    if (!subgoal) {
      // Sanity check
      return null;
    }

    const completedChildren = subgoal.subgoals.filter(goal => goal.completed).length;
    const totalChildren = subgoal.subgoals.length;

    return (
      <div>
        <header>
          <h3
            className="editable"
            contentEditable="true"
            onPaste={this.handlePasteAsPlainText}
            onInput={this.handleInputTitle}
          >
            {subgoal.name}
          </h3>
          <button
            className="button-close"
            onClick={this.props.onRequestClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </header>
        <div className="columns">
          <section className="column-main">
            <h4>Progress</h4>
            {totalChildren > 0 ? (
              <p>{completedChildren} / {totalChildren} subgoals completed</p>
            ) : (
              <p>{subgoal.completed ? 'Completed' : 'Incomplete' }</p>
            )}
          </section>
          <aside className="column-aside">
            <button
              className="button-side"
              onClick={() => this.props.onToggleComplete(subgoal)}
            >
              Mark as {subgoal.completed ? 'incomplete' : 'complete'}
            </button>
            <button
              className="button-side"
              onClick={this.handleViewChildren}
            >
              View children
            </button>
            <button
              className="button-side"
              onClick={() => this.props.onDelete(subgoal)}
            >
              Delete goal
            </button>
          </aside>
        </div>
      </div>
    );
  }

}

export default EditSubgoalModal;