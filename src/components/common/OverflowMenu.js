import React from 'react';
import ReactDOM from 'react-dom';

import './OverflowMenu.scss';

// Root element for menus
const menuRoot = document.getElementById('menu-root');

class OverflowMenu extends React.Component {

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.renderMenu = this.renderMenu.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    // Add element to menu root; we will render into this using a portal
    menuRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove element from menu root
    menuRoot.removeChild(this.el);
  }

  handleBlur(e) {
    if (this.menuRef) {
      // Determine whether or not we 
      let elem = e.relatedTarget;
      let insideMenu = false;

      // Climb element tree until we reach a node equal to our 
      // menu element, or until we've reached the top of the tree
      while (elem && elem.parentNode) {
        elem = elem.parentNode;
        if (elem == this.menuRef) {
          insideMenu = true;
          break;
        }
      }

      // If we're NOT inside the menu element (i.e. we're not
      // blurring as a result of clicking a button), then close
      // the menu
      if (!insideMenu) {
        this.props.onCloseMenu();
      }
    }
  }

  render() {
    return ReactDOM.createPortal(
      this.renderMenu(),
      this.el
    );
  }

  renderMenu() {
    // Don't render anything if we aren't visible or if we aren't
    // anchored to anything
    if (!this.props.visible
      || !this.props.anchorRef.current) {
      return null;
    }

    // Get position of element to which to anchor the menu
    const pos = this.props.anchorRef.current.getBoundingClientRect();
    
    // Utility function for closing menu when onClick() returns true
    const createClickHandler = (onClick) => {
      return () => {
        if (onClick()) {
          this.props.onCloseMenu();
        }
      }
    };

    return (
      this.props.visible &&
      <div 
        className={`overflow-menu ${this.props.visible ? 'visible' : ''}`}
        style={{
          top: `${pos.top}px`,
          left: `${pos.left}px`
        }}
        tabIndex="-1"
        ref={(ref) => {ref && ref.focus(); this.menuRef = ref}}
        onBlur={this.handleBlur}
      >
        <ul>
          {this.props.items.map((item) =>
          <li>
            <button onClick={createClickHandler(item.onClick)}>
              {item.text}
            </button>
          </li>
          )}
        </ul>
      </div>
    );
  }

}

export default OverflowMenu;