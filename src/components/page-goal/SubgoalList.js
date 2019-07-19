import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Tree from '@atlaskit/tree';

import { flattenGoals } from '../../logic/goalSelectors.js';
import './SubgoalList.scss';
import OverflowMenu from '../common/OverflowMenu.js';
import EditSubgoalModal from './EditSubgoalModal.js';

class SubgoalList extends Component {
  constructor(props) {
    super(props);

    this.getTreeData = this.getTreeData.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openSubgoalDialog = this.openSubgoalDialog.bind(this);
    this.closeSubgoalDialog = this.closeSubgoalDialog.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.convertGoalToTreeItem = this.convertGoalToTreeItem.bind(this);

    this.state = {
      menu: {
        open: false,
        anchorRef: null,
        items: []
      },
      modal: {
        open: false,
        subgoal: null
      },
      collapsedGoals: {}
    };
  }

  convertGoalToTreeItem(goal) {
    return {
      id: goal.id,
      children: goal.subgoals.map((sg) => sg.id),
      hasChildren: goal.subgoals.length > 0,
      isExpanded: !(goal.id in this.state.collapsedGoals),
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

  handleCollapse(itemId) {
    this.setState(state => {
      let newState = { ...state };

      newState.collapsedGoals[itemId] = true;

      return newState;
    });
  }

  handleExpand(itemId) {
    this.setState(state => {
      let newState = { ...state };

      if (itemId in newState.collapsedGoals) {
        delete newState.collapsedGoals[itemId];
      }

      return newState;
    });
  }

  openMenu(subgoal, anchorRef) {
    this.setState(state => {
      let newState = { ...state };

      newState.menu = {
        open: true,
        anchorRef: anchorRef,
        items: [
          { text: 'Edit subgoal', onClick: () => { return true; } },
          { text: 'Delete subgoal', onClick: () => {} }
        ]
      };

      return newState;
    });
  }

  closeMenu() {
    this.setState(state => {
      let newState = { ...state };

      newState.menu = {
        open: false,
        anchorRef: null,
        items: []
      };

      return newState;
    });
  }

  openSubgoalDialog(subgoal) {
    this.setState(state => {
      let newState = { ...state };

      newState.modal.open = true;
      newState.modal.subgoal = subgoal;

      return newState;
    })
  }

  closeSubgoalDialog() {
    this.setState(state => {
      let newState = { ...state };
      
      newState.modal.open = false;
      setTimeout(() => {
        newState.modal.subgoal = null;
      }, 200); // TODO make 200 const

      return newState;
    })
  }

  renderItem({ item, depth, onExpand, onCollapse, provided, snapshot }) {
    return (
      <Subgoal
        item={item}

        depth={depth}
        provided={provided}
        snapshot={snapshot}

        onExpand={onExpand}
        onCollapse={onCollapse}
        openMenu={this.openMenu}
        openSubgoalDialog={this.openSubgoalDialog}
      />
    );
  }

  render() {
    const tree = this.getTreeData();

    return (
      <div className="subgoal-list">
        <Tree
          tree={tree}
          renderItem={this.renderItem}
          onExpand={this.handleExpand}
          onCollapse={this.handleCollapse}
          onDragEnd={this.props.onDragEnd}
          offsetPerLevel={0}
          isDragEnabled
          isNestingEnabled
        />

        <AddSubgoal
          onAddKeyPress={(e) => this.props.onAddKeyPress(e, this.props.goal.id)}
          depth={this.props.newSubgoalDepth} />

        <OverflowMenu
          visible={this.state.menu.open}
          items={this.state.menu.items}
          anchorRef={this.state.menu.anchorRef}
          closeMenu={this.closeMenu}
        ></OverflowMenu>

        <ReactModal
          isOpen={this.state.modal.open}
          contentLabel="Edit subgoal"
          onRequestClose={this.closeSubgoalDialog}
          overlayClassName="modal-overlay"
          className="subgoal-modal"
          closeTimeoutMS={200}
        >
          <EditSubgoalModal
            subgoal={this.state.modal.subgoal}
          />
        </ReactModal>
      </div>
    );
  }
}

/**
 * A single subgoal list item in a list of subgoals
 * @param {*} item The tree item corresponding to this subgoal
 * @param {number} depth How deeply nested this subgoal is
 * @param {TreeDraggableProvided} provided Provided properties that control dragging
 * @param {DraggableStateSnapshot} snapshot State for dragging
 * @param {*} onExpand Callback for expanding the item
 * @param {*} onCollapse Callback for collapsing the item
 */
const Subgoal = (
  {
    item,
    depth,
    provided,
    snapshot,
    onExpand,
    onCollapse,
    openMenu,
    openSubgoalDialog
  }
) => {
  const subgoal = item.data.goal;
  const ref = React.createRef();

  const toggleExpanded = () => item.isExpanded ? onCollapse(item.id) : onExpand(item.id);

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
        className="subgoal-list-item-text"
        onClick={() => openSubgoalDialog(subgoal)}
      >
        {subgoal.name}
      </div>

      {item.hasChildren && 
        <div
          className="toggle-expand"
          onClick={toggleExpanded}>
          <i className={'fas fa-chevron-' + (item.isExpanded ? 'up' : 'down')}></i>
        </div>
      }

      <button
        href="#"
        className="button-overflow"
        onClick={() => openMenu(subgoal, ref)}>
        <i
          ref={ref}
          className="fas fa-ellipsis-v">
        </i>
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