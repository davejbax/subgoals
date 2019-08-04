import React from 'react';

import { getGoalColor } from '../logic/goalProcessing.js';

// Pages
import PageMain from './page-main/PageMain.js';
import PageGoal from './page-goal/PageGoal.js';
import NavBar from './common/NavBar.js';

// CSS
import './App.scss';

const App = ({ title, selectedGoal, hasBack, onGoBack }) => {
  const color = selectedGoal != null
    ? (selectedGoal.color
      || getGoalColor(selectedGoal))
    : 'primary';

  return (
    <div id="main">
      <NavBar
        title={title}
        hasBack={hasBack}
        onGoBack={onGoBack}
        color={color} />
      <section id="body" className="page-width page-margins">
        {
          selectedGoal == null ?
            <PageMain /> :
            <PageGoal goal={selectedGoal} />
        }
      </section>
    </div>
  );
};

export default App;