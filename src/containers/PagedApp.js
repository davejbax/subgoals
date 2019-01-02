import { connect } from 'react-redux';

import { findGoalById } from '../logic/goalSelectors.js';
import { goBack } from '../actions/page.js';
import App from '../components/App.js';

const mapStateToProps = state => ({
  selectedGoal: findGoalById(state.goals.goals, state.page.selectedGoalId),
  title: state.page.title,
  hasBack: state.page.selectedGoalId != null
});

const mapDispatchToProps = dispatch => ({
  onGoBack: () => dispatch(goBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);