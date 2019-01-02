import { connect } from 'react-redux';
import { addSubgoal, moveSubgoal } from '../actions/goals.js';
import { changeNewSubgoalDepth } from '../actions/page.js';

import SubgoalList from '../components/SubgoalList.js';

function onAddKeyPress(dispatch, e, goalId) {
	if (e.key === 'Enter' && !e.shiftKey) {		
		dispatch(addSubgoal(e.target.textContent, goalId));
		e.preventDefault();
		e.target.textContent = '';
	} else if (e.key === 'Tab') {
		e.preventDefault();
		// +1 if shift not held, -1 otherwise
		dispatch(changeNewSubgoalDepth(e.shiftKey ? -1 : 1));
	}
}

function onDragEnd(dispatch, rootId, result) {
	dispatch(moveSubgoal(rootId, result.source.index, result.destination.index));
}

const mapStateToProps = state => ({
	newSubgoalDepth: state.page.newSubgoalDepth
});

const mapDispatchToProps = dispatch => ({
	onAddKeyPress: (e, goalId) => onAddKeyPress(dispatch, e, goalId),
	onDragEnd: (rootId, result) => onDragEnd(dispatch, rootId, result)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubgoalList);