import React, { Component } from 'react';

// Pages
import PageMain from './PageMain.js';
import PageGoal from './PageGoal.js';
import NavBar from './NavBar.js';

// CSS
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      goals: [
        {
          id: 0,
          name: 'Getting fit',
          color: 'salmon',
          subgoals: [
            {
              id: 2,
              name: 'Memes',
              completed: false,
              points: 0,
              daily: false,
              subgoals: [
                {
                  id: 3,
                  name: 'Nesting',
                  completed: true,
                  points: 0,
                  daily: false,
                  subgoals: []
                },
                {
                  id: 4,
                  name: 'This is a goal with a particularly long name, created for the purpose of demonstrating multiline functionality whereby multiple lines of text can be displayed in a single element!',
                  completed: true,
                  points: 0,
                  daily: false,
                  subgoals: []
                }
              ]
            }
          ],
          completed: false,
          points: 0,
          daily: false
        },
        {
          id: 1,
          name: 'Reading',
          color: 'aquamarine',
          subgoals: [],
          completed: false,
          points: 0,
          daily: false
        }
      ],

      title: 'Subgoals',

      selectedGoal: null
    };
    this.onOpenGoal = this.onOpenGoal.bind(this);
    this.onGoBack = this.onGoBack.bind(this);
    this.hasBack = this.hasBack.bind(this);
  }

  setSelectedGoal(goal) {
    // Clone state
    // NOTE: this doesn't deep clone. Arrays etc. should NOT be modified
    // in place (but this would violate the principle of not mutating
    // state anyway).
    var newState = Object.assign({}, this.state);
    newState.selectedGoal = goal;
    newState.title = goal != null ? goal.name : 'Subgoals';
    this.setState(newState);
  }

  onOpenGoal(goal) {
    this.setSelectedGoal(goal);
  }

  onGoBack() {
    this.setSelectedGoal(null);
  }

  hasBack() {
    return this.state.selectedGoal != null;
  }

  render() {
    const page = this.state.selectedGoal == null ?
      <PageMain goals={this.state.goals} onOpenGoal={this.onOpenGoal} /> :
      <PageGoal goal={this.state.selectedGoal} />;

    return (
      <div>
        <NavBar
          title={this.state.title}
          hasBack={this.hasBack()}
          onGoBack={this.onGoBack}
          color={this.state.selectedGoal != null ? this.state.selectedGoal.color : 'primary'} />
        <section id="body" className="page-width page-margins">
          {page}
        </section>
      </div>
    );
  }

}

export default App;
