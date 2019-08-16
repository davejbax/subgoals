import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import 'date-input-polyfill-react';

import { isLeafNode, isGoalCompleted, isDailyGoal } from '../../logic/goalProcessing.js';
import { TYPE_DEADLINE, TYPE_MANUAL, TYPE_TARGET } from '../../logic/dailyGoals.js';
import './EditSubgoalModal.scss';
import DailyGoalHistory from './DailyGoalHistory.js';

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

  renderProgress() {
    const subgoal = this.props.subgoal;

    // If the subgoal has children, it cannot be 'complete' in an explicit sense,
    // so we tell the user how far it is to becoming 'implicitly complete', by
    // showing them the number of direct children that are 'complete'.
    if (!isLeafNode(subgoal)) {
      const completedChildren = subgoal.subgoals
        .filter(goal => isGoalCompleted(goal))
        .length;
      const totalChildren = subgoal.subgoals.length;

      return (
        <p>{completedChildren} / {totalChildren} subgoals completed</p>
      );
    // Otherwise, we show a simple check/cross to indicate whether it is complete
    // explicitly.
    } else {
      return (
        <p>
          <i className={`progress-indicator fas fa-${subgoal.completed ? 'check' : 'times'}`}></i>
          {subgoal.completed ? 'Completed' : 'Incomplete' }
        </p>
      );
    }
  }

  renderDaily() {
    const subgoal = this.props.subgoal;

    return (
      <>
        <h4>Daily</h4>
        <div className="daily-controls">
          {this.renderDailyControls()}
        </div>
        <DailyGoalHistory
          data={subgoal.daily}
          onMarkDay={this.props.onMarkDay.bind(null, subgoal)}
          onUnmarkDay={this.props.onUnmarkDay.bind(null, subgoal)}
        />
      </>
    );
  }

  renderDailyControls() {
    const subgoal = this.props.subgoal;
    const daily = subgoal.daily;

    // Render different controls based on the type of daily goal.
    // E.g. manual goals don't require any kind of inputs
    let controls;
    switch (daily.type) {
      case TYPE_MANUAL:
        const completions = daily.history.length;
        controls = (
          <>
            <label>Progress</label>
            <span><b className="boxed-text">{completions}</b> completions</span>
          </>
        )
        break;
      case TYPE_TARGET:
        const progress = daily.history.length / (daily.typeConfig || 1) * 100;
        controls = (
          <>
            <label for="target">Target</label>
            <span>
              <input
                type="number"
                name="target"
                min="1"
                value={daily.typeConfig}
                onChange={(e) => this.props.onConfigureDailyType(subgoal, parseInt(e.target.value))}
              />
            </span>
            <label>Progress</label>
            <span className="progress-bar">
              <div className="progress-bar__bar">
                <span className="fill" style={{
                  width: Math.min(progress, 100) + '%'
                }}></span>
              </div>
              <span className="progress-bar__label">{Math.floor(progress)}%</span>
            </span>
          </>
        );
        break;
      case TYPE_DEADLINE:
        const pad = (num, length) => {
          let numString = num + '';
          while (numString.length < length)
            numString = '0' + numString;
          return numString;
        }
        const convertInputToConfig = (value) =>
          value ? new Date(value).toISOString() : null;
        const convertConfigToInput = (config) => {
          if (!config)
            return '';

          const date = new Date(config);
          return pad(date.getFullYear(), 4)
            + '-'
            + pad(date.getMonth() + 1, 2)
            + '-'
            + pad(date.getDate(), 2);
        }
        const daysLeft = daily.typeConfig ?
          Math.ceil((new Date(daily.typeConfig) - new Date()) / (24 * 60 * 60 * 1000))
          : '?';
        controls = (
          <>
            <label for="deadline">Deadline</label>
            <span>
              <input
                type="date"
                name="deadline"
                onChange={(e) => this.props.onConfigureDailyType(subgoal, convertInputToConfig(e.target.value))}
                value={convertConfigToInput(daily.typeConfig)}
              />
            </span>
            <label>Progress</label>
            <span>
              <b className="boxed-text">{daysLeft}</b> days until deadline,&nbsp;
              <b className="boxed-text">{daily.history.length}</b> completions
            </span>
          </>
        );
        break;
      default:
        controls = <></>;
    }

    return (
      <>
        <label for="type">Type</label>
        <span>
          <select
            name="type"
            value={daily.type}
            onChange={(e) => this.props.onChangeDailyType(subgoal, e.target.value)}
          >
            <option value={TYPE_MANUAL}>Manual</option>
            <option value={TYPE_TARGET}>Target</option>
            <option value={TYPE_DEADLINE}>Deadline</option>
          </select>
        </span>
        {controls}
      </>
    );
  }

  render() {
    const subgoal = this.props.subgoal;
    if (!subgoal) {
      // Sanity check
      return null;
    }

    return (
      <div className="subgoal-modal-container">
        <header>
          {
            /* We use a content editable here because we want an h3 tag (1) which
             * grows in response to its content length: e.g. if a user types out a
             * long title, we want multiple lines (but only single line if required)
             */
          }
          <ContentEditable
            className="editable"
            innerRef={this.titleRef}
            html={this.props.subgoal.name}
            disabled={false}
            onChange={this.handleInputTitle}
            tagName="h3"
            onPaste={this.handlePasteAsPlainText}
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
            {/* Progress section */}
            <h4>Progress</h4>
            {this.renderProgress()}

            {/* Daily section (if applicable) */}
            {isDailyGoal(subgoal) && this.renderDaily()}
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