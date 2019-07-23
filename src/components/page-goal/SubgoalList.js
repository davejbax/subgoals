import Tree from '@atlaskit/tree';
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { flattenGoals } from '../../logic/goalSelectors.js';
import OverflowMenu from '../common/OverflowMenu.js';
import EditSubgoalModal from './EditSubgoalModal.js';
import SubgoalListItem from './SubgoalListItem.js';
import './SubgoalList.scss';

class SubgoalList extends Component {
  constructor(props) {
    super(props);

    this.getTreeData = this.getTreeData.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.convertGoalToTreeItem = this.convertGoalToTreeItem.bind(this);
    
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);

    this.openSubgoalDialog = this.openSubgoalDialog.bind(this);
    this.closeSubgoalDialog = this.closeSubgoalDialog.bind(this);

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

  handleOpenMenu(subgoal, anchorRef) {
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

  handleCloseMenu() {
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

  handleCompleteSubgoal() {
    // TODO
  }

  renderItem({ item, depth, onExpand, onCollapse, provided, snapshot }) {
    const toggleExpanded = () => item.isExpanded ? onCollapse(item.id) : onExpand(item.id);
    const subgoal = item.data.goal;

    return (
      <span
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={provided.draggableProps.style}
      >
        <SubgoalListItem
          isExpandable={item.hasChildren}
          isExpanded={item.isExpanded}
          onToggleExpanded={toggleExpanded}
          onClick={() => this.openSubgoalDialog(subgoal)}
          onComplete={() => this.handleCompleteSubgoal(subgoal)}
          onOpenMenu={(anchorRef) => this.handleOpenMenu(subgoal, anchorRef)}
          depth={depth}
        >
          { subgoal.name }
        </SubgoalListItem>
      </span>
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
          onCloseMenu={this.handleCloseMenu}
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