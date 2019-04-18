import React, { Component } from 'react';
import Tree from '@atlaskit/tree';

import { flattenGoals } from '../logic/goalSelectors.js';
import './SubgoalList.scss';

class SubgoalList extends Component {
  constructor(props) {
    super(props);
    this.getTreeData = this.getTreeData.bind(this);
  }

  convertGoalToTreeItem(goal) {
    return {
      id: goal.id,
      children: goal.subgoals.map((sg) => sg.id),
      hasChildren: goal.subgoals.length > 0,
      isExpanded: true,
      isChildrenLoading: false,
      data: { goal: goal }
    };
  }

  getTreeData() {
    // Form list of tree items from list of goals
    const items = flattenGoals(this.props.goal.subgoals)
      .map(this.convertGoalToTreeItem);

    // Add the root node, i.e. the goal this subgoal list is tied to
    items.push(this.convertGoalToTreeItem(this.props.goal));

    // Return a TreeData type for the @atlaskit/tree package
    return {
      rootId: this.props.goal.id,
      items: items.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {})
    }
  }

  renderItem({ item, depth, onExpand, onCollapse, provided }) {
    return (
      <Subgoal
        provided={provided}
        depth={depth}
        subgoal={item.data.goal}
      />
    );
  }

  onExpand(itemId) {
    // TODO
    console.log('on expand');
  }

  onCollapse(itemId) {
    // TODO
    console.log('on collapse');
  }

  render() {
    const tree = this.getTreeData();

    return (
      <div className="subgoal-list">
        <Tree
          tree={tree}
          renderItem={this.renderItem}
          onExpand={this.onExpand}
          onCollapse={this.onCollapse}
          onDragEnd={this.props.onDragEnd}
          offsetPerLevel={0}
          isDragEnabled
          isNestingEnabled
        />
        <AddSubgoal
          onAddKeyPress={(e) => this.props.onAddKeyPress(e, this.props.goal.id)}
          depth={this.props.newSubgoalDepth} />
      </div>
    );
  }
}

const Subgoal = ({ subgoal, depth, provided, snapshot, getIndex }) => {
  return (
    <div
      className={`subgoal-list-item depth-${depth}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={provided.draggableProps.style}>

      <button
        href="#"
        className="button-complete">
        <i className="fas fa-check"></i>
      </button>

      <div
        className="subgoal-list-item-text">
        {subgoal.name}
      </div>

      <button
        href="#"
        className="button-overflow">
        <i className="fas fa-ellipsis-v"></i>
      </button>
    </div>
  );
}

const AddSubgoal = ({ onAddKeyPress, depth }) =>
  <div className={`subgoal-list-item subgoal-list-add depth-${depth}`}>
    <div
      className="subgoal-list-item-text"
      placeholder="Type here"
      contentEditable="true"
      onKeyDown={onAddKeyPress} />
    <i className="fas fa-plus button-add"></i>
  </div>

export default SubgoalList;