import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';

import { isLeafNode } from '../../logic/goalProcessing.js';
import './EditSubgoalModal.scss';

class EditSubgoalModal extends Component {

  constructor(props) {
    super(props);

    this.handleInputTitle = this.handleInputTitle.bind(this);
    this.handleViewChildren = this.handleViewChildren.bind(this);
    this.titleRef = React.createRef();
  }

  handlePasteAsPlainText(event) {
    event.preventDefault();

    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }

  handleInputTitle(event) {
    let newTitle = this.titleRef.current.textContent;

    // Don't trigger change if we haven't changed!
    if (newTitle === this.props.subgoal.name) {
      return;
    }

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

    const completedChildren = subgoal.subgoals.filter(goal => goal.completed || goal.completedImplicit).length;
    const totalChildren = subgoal.subgoals.length;

    return (
      <div>
        <header>
          <ContentEditable
            className="editable"
            innerRef={this.titleRef}
            html={this.props.subgoal.name}
            disabled={false}
            onChange={this.handleInputTitle}
            tagName="h3"
            onPaste={this.handlePasteAsPlainText}
            // onInput={this.handleInputTitle}
          />
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
            {isLeafNode(subgoal) ?
              <button
                className="button-side"
                onClick={() => this.props.onToggleComplete(subgoal)}
              >
                Mark as {subgoal.completed ? 'incomplete' : 'complete'}
              </button>
            :
              <button
                className="button-side"
                onClick={this.handleViewChildren}
              >
                View children
              </button>
            }
            <button
              className="button-side"
              onClick={() => this.props.onDelete(subgoal, this.props.onRequestClose)}
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