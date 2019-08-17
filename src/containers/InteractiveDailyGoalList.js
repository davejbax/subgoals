import { connect } from 'react-redux';
import DailyGoalList from '../components/page-main/DailyGoalList.js';
import { getActiveDailyGoals, addToDaily, removeLatestFromDaily } from '../ducks/goals.js';

const mapStateToProps = (state) => {
  return {
    goals: getActiveDailyGoals(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMarkDay: (subgoal, date) => dispatch(addToDaily(subgoal.id, date.toISOString())),
    onUnmarkDay: (subgoal, date) => dispatch(removeLatestFromDaily(subgoal.id, date.toISOString()))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyGoalList);