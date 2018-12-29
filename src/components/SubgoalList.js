import React, { Component } from 'react';
import './SubgoalList.scss';

class SubgoalList extends Component {
	render() {
		const subgoals = this.props.subgoals.map(subgoal =>
			<Subgoal
				subgoal={subgoal}
				depth={this.props.depth || 0} />
		);

		const newSubgoal = this.props.depth > 0 ? null :
			<AddSubgoal />;

		return (
			<div
				className={`subgoal-list depth-${this.props.depth}`}>
				{subgoals}
				{newSubgoal}
			</div>
		);
	}
}

const Subgoal = ({ subgoal, depth }) => {
	let subsubgoals = subgoal.subgoals.length > 0 ? 
		<SubgoalList
			subgoals={subgoal.subgoals}
			depth={depth + 1} />
		: null;

	return (
		<>
			<div
				className="subgoal-list-item">
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

const AddSubgoal = () =>
	<div className="subgoal-list-item subgoal-list-add">
		<div
			className="subgoal-list-item-text"
			placeholder="Type here"
			contentEditable="true" />
		<i className="fas fa-plus button-add"></i>
	</div>

export default SubgoalList;