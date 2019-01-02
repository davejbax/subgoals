import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getGoalIndex, getFlattenedGoals } from '../logic/goalSelectors.js';
import './SubgoalList.scss';

class SubgoalList extends Component {
	render() {
		// Determine whether we are the root subgoal list
		// Note: being the root list requires an additional property, onDragEnd
		const isRootList = !this.props.depth;

		// Create a function to retrieve the index of a particular goal in our list
		// Note that this is relative to the root subgoal list, so for depth > 0,
		// we use a property passed down to recursively implemented subgoal lists.
		const flattenedGoals = getFlattenedGoals(this.props.goal.subgoals)
			.map((goal) => goal.id);
		const getIndex = isRootList ?
			((id) => flattenedGoals.indexOf(id)) :
			this.props.getIndex;

		// Map each subgoal to an element; elements are wrapped in a Draggable container,
		// which allows them to be rearranged in the list.
		const subgoals = this.props.goal.subgoals.map(subgoal =>
			<Draggable
				key={subgoal.id}
				draggableId={subgoal.id}
				index={getIndex(subgoal.id)}>
				{(provided, snapshot) =>
					<Subgoal
						subgoal={subgoal}
						depth={this.props.depth || 0}
						provided={provided}
						snapshot={snapshot}
						getIndex={getIndex} />
				}
			</Draggable>
		);

		// If we are the root, display a new subgoal field that allows users to create
		// new subgoals and add them to the list
		const newSubgoal = isRootList ?
			<AddSubgoal
				onAddKeyPress={(e) => this.props.onAddKeyPress(e, this.props.goal.id)}
				depth={this.props.newSubgoalDepth} /> :
			null;

		if (!isRootList) {
			// If we are not the root list, do NOT wrap subgoal list in a DragDropContext
			return (
				<div
					className={`subgoal-list depth-${this.props.depth}`}>
					{subgoals}
					{newSubgoal}
				</div>
			);
		} else {
			// If we are the root list, wrap subgoal list in DragDropContext
			return (
				<DragDropContext onDragEnd={(result) => this.props.onDragEnd(this.props.goal.id, result)}>
					<Droppable droppableId="subgoalList">
						{(provided, snapshot) =>
							<div
								className={`subgoal-list depth-${this.props.depth}`}
								ref={provided.innerRef}>
								{subgoals}
								{newSubgoal}
							</div>
						}
					</Droppable>
				</DragDropContext>
			);
		}
	}
}

const Subgoal = ({ subgoal, depth, provided, snapshot, getIndex }) => {
	let subsubgoals = subgoal.subgoals.length > 0 ? 
		<SubgoalList
			goal={subgoal}
			depth={depth + 1}
			getIndex={getIndex} />
		: null;

	return (
		<>
			<div
				className="subgoal-list-item"
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
			{subsubgoals}
		</>
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