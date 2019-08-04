import { connect } from 'react-redux';

import { setGoalName } from '../ducks/goals.js';
import EditSubgoalModal from '../components/page-goal/EditSubgoalModal.js';

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  onChangeTitle: (subgoal, title) => dispatch(setGoalName(subgoal.id, title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubgoalModal);