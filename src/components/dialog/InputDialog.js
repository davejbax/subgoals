import React, { Component } from 'react';
import Dialog from './Dialog.js';

import './InputDialog.scss';

class InputDialog extends Component {

  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: props.value
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onClose();
    this.props.onAccept(this.state.value);
  }

  handleChangeInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    // Reset value if we're reopening an existing dialog component
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  render() {
    const { text, ...others } = this.props;

    return (
      <Dialog {...others}>
        <header>
          <h3>{this.props.text}</h3>
          <button onClick={this.props.onClose}><i className="fas fa-times"></i></button>
        </header>
        <section>
          <form
            action=""
            onSubmit={this.handleSubmit}
          >
            <p>
              <input
                type="text"
                className="large-input"
                onChange={this.handleChangeInput}
                value={this.state.value}
                autoFocus={true}
              />
            </p>
            <div className="buttons">
              <button
                className="button button--primary"
                type="submit"
              >
                OK
              </button>
              <button
                className="button"
                type="button"
                onClick={() => {this.props.onClose(); this.props.onReject();}}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </Dialog>
    );
  }
}

export default InputDialog;