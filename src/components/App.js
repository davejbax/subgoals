import React, { Component } from 'react';

// Pages
import PageMain from './PageMain.js';
import PageGoal from './PageGoal.js';
import NavBar from './NavBar.js';

// CSS
import './App.scss';

const App = ({ title, selectedGoal, hasBack, onGoBack }) =>   
  <div>
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