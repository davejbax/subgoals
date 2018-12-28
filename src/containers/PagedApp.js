import { connect } from 'react-redux';

import { goBack } from '../actions/page.js';
import App from '../components/App.js';

const mapStateToProps = state => ({
  selectedGoal: state.page.selectedGoal,
  title: state.page.title,
  hasBack: state.page.selectedGoal != null
});

const mapDispatchToProps = dispatch => ({
  onGoBack: () => dispatch(goBack())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);