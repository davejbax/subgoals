import React, { Component } from 'react';
import './SubgoalList.scss';

// class SubgoalListContainer extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
// 		this.onItemMouseLeave = this.onItemMouseLeave.bind(this);
// 		this.state = {
// 			hoveredItem: null
// 		}
// 	}

// 	setCompleteButtonVisiblity(parent, visible) {
// 		Array.from(parent.querySelectorAll('[data-btn-complete]'))
// 			.filter((el) => el.parentNode === parent)
// 			.forEach((el) => el.setAttribute('data-visible', visible));
// 	}

// 	onItemMouseEnter(e) {
// 		// Hide any old complete buttons from other items
// 		if (this.state.hoveredItem != null)
// 			this.setCompleteButtonVisiblity(this.state.hoveredItem, false);

// 		// Show our complete buttons
// 		this.setCompleteButtonVisiblity(e.target, true);

// 		// Update state
// 		this.setState({ hoveredItem: e.target });
// 	}

// 	onItemMouseLeave(e) {
// 		if (this.state.hoveredItem != null)
// 			this.setCompleteButtonVisiblity(this.state.hoveredItem, false);
// 	}

// 	render() {
// 		return <SubgoalList
// 			subgoals={this.props.subgoals}
// 			onMouseEnter={this.onItemMouseEnter}
// 			onMouseLeave={this.onItemMouseLeave}
// 			depth={0} />;
// 	}
// }

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
				<a
					href="#"
					className="button-complete">
					<i className="fas fa-check"></i>
				</a>

				<div
					className="subgoal-list-item-text">
					{subgoal.name}
				</div>

				<a
					href="#"
					className="button-overflow">
					<i className="fas fa-ellipsis-v"></i>
				</a>
			</div>
			{subsubgoals}
		</>
	);
}

const AddSubgoal = ({}) =>
	<div className="subgoal-list-item subgoal-list-add">
		<div
			className="subgoal-list-item-text"
			placeholder="Type here"
			contentEditable="true" />
		<i className="fas fa-plus button-add"></i>
	</div>

export default SubgoalList;