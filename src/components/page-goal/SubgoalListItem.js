import React from 'react';

import './SubgoalListItem.scss';

const SubgoalListItem = ({
  hasChildren,
  isComplete,
  isExpanded,
  isDaily,
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
        className='button-complete'
        onClick={onComplete}
        disabled={hasChildren}
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
      {hasChildren && 
        <div
          className="toggle-expand"
          onClick={onToggleExpanded}
        >
          <i className={'fas fa-chevron-' + (isExpanded ? 'up' : 'down')}></i>
        </div>
      }

      {/* Daily goal indicator */}
      {isDaily &&
        <span className="daily-indicator">
          <i className="fas fa-calendar"></i>
        </span>
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