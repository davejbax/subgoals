import React from 'react';

import InteractiveGoalList from '../../containers/InteractiveGoalList.js';
import InteractiveDailyGoalList from '../../containers/InteractiveDailyGoalList.js';

const PageMain = ({ goals, setSelectedGoal }) =>
  <div>
    <h2>Daily Goals</h2>
    <InteractiveDailyGoalList />
    <h2>Goals</h2>
    <InteractiveGoalList />
  </div>;

export default PageMain;