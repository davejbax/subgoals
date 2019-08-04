import { connect } from 'react-redux';

import { setSubgoalTitle } from '../actions/goals.js';
import EditSubgoalModal from '../components/page-goal/EditSubgoalModal.js';

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  onChangeTitle: (subgoal, title) => dispatch(setSubgoalTitle(subgoal, title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubgoalModal);