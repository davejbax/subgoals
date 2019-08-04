import React from 'react';

import './SubgoalListItem.scss';

const SubgoalListItem = ({
  isComplete,
  isExpandable,
  isExpanded,
  onToggleExpanded,
  onClick,
  onComplete,
  onOpenMenu,
  depth,
  children
}) => {
  const anchorRef = React.createRef();

  return (
    <div
      className={`subgoal-list-item depth-${depth} ${isComplete ? 'complete' : ''}`}
    >

      {/* Complete/check button */}
      <button
        href="#"
        className="button-complete"
        onClick={onComplete}
      >
        <i className="fas fa-check"></i>
      </button>

      {/* Main text */}
      <div
        className="subgoal-list-item-text"
        onClick={onClick}
      >
        {children}
      </div>

      {/* Expand/collapse button/indicator */}
      {isExpandable && 
        <div
          className="toggle-expand"
          onClick={onToggleExpanded}
        >
          <i className={'fas fa-chevron-' + (isExpanded ? 'up' : 'down')}></i>
        </div>
      }

      {/* Overflow button */}
      <button
        href="#"
        className="button-overflow"
        onClick={() => onOpenMenu(anchorRef)}
      >
        <i
          ref={anchorRef}
          className="fas fa-ellipsis-v"
        >
        </i>
      </button>
    </div>
  );
}

export default SubgoalListItem;