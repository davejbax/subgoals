import React, { Component } from 'react';
import Dialog from './Dialog.js';
import { getNumGoalColors } from '../../logic/goalProcessing.js';

import './ColorPickerDialog.scss';

class ColorPickerDialog extends Component {
  constructor(props) {
    super(props);

    this.renderColorButtons = this.renderColorButtons.bind(this);

    this.state = this.generateInitialState(props);
  }

  generateInitialState(props) {
    return {
      selected: props.value || 'color-0'
    };
  }

  componentWillReceiveProps(nextProps) {
    // If we're re-opening, update the state as if we were constructing
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState(this.generateInitialState(nextProps));
    }
  }

  handleChangeSelected(newSelected) {
    this.setState({
      selected: newSelected
    })
  }

  renderColorButtons() {
    let buttons = [];
    for (let i = 0; i < getNumGoalColors(); i++) {
      const selectedClass = `color-${i}` === this.state.selected ? 'selected' : '';
      buttons.push(
        <button
          className={`color-button bg-color-${i} ${selectedClass}`}
          onClick={() => this.handleChangeSelected(`color-${i}`)}
        >
          <i className="fas fa-check"></i>
        </button>
      );
    }
    return buttons;
  }

  render() {
    return (
      <Dialog {...this.props}>
        <header>
          <h3>Choose colour</h3>
          <button onClick={this.props.onClose}><i className="fas fa-times"></i></button>
        </header>
        <section>
          <div className="color-picker">
            {this.renderColorButtons()}
          </div>
          <div className="buttons">
            <button
              className="button button--primary"
              onClick={() => {this.props.onClose(); this.props.onAccept(this.state.selected);}}
            >
              OK
            </button>
            <button
              className="button"
              onClick={() => {this.props.onClose(); this.props.onReject();}}
            >
              Cancel
            </button>
          </div>
        </section>
      </Dialog>
    );
  }
}

export default ColorPickerDialog;