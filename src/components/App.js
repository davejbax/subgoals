import React from 'react';

// Pages
import PageMain from './page-main/PageMain.js';
import PageGoal from './page-goal/PageGoal.js';
import NavBar from './common/NavBar.js';

// CSS
import './App.scss';

const App = ({ title, selectedGoal, hasBack, onGoBack }) =>   
  <div id="main">
    <NavBar
      title={title}
      hasBack={hasBack}
      onGoBack={onGoBack}
      color={selectedGoal != null ? selectedGoal.color : 'primary'} />
    <section id="body" className="page-width page-margins">
      {
        selectedGoal == null ?
          <PageMain /> :
          <PageGoal goal={selectedGoal} />
      }
    </section>
  </div>;

export default App;