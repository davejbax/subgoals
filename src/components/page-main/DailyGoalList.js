import React, { Component } from 'react';

import './DailyGoalList.scss';

class DailyGoalList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      days: []
    };

    let currentDate = new Date(); // Start at today
    for (let i = 0; i < 7; i++) {
      this.state.days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() - 1);
    }
  }

  formatDate(date) {
    return date.toLocaleString('default', { month: '2-digit', day: '2-digit' });
  }

  isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
  }

  isToday(date) {
    const now = new Date();
    return this.isSameDay(now, date);
  }

  getDayCounts() {
    let counts = {};

    const historyDates = this.props.goals.map(
      goal => goal.daily.history.map(
        dateString => new Date(dateString)
      )
    );

    for (let i = 0; i < this.props.goals.length; i++) {
      const goalId = this.props.goals[i].id;

      // Initialize counts for this goal
      counts[goalId] = {};

      // Examine each date in the history of this goal
      for (let historyDate of historyDates[i]) {
        // Attempt to find a date that's the same in ours
        const ourDate = this.state.days.find(
          other => this.isSameDay(other, historyDate)
        );

        // If this date is included in our days, then add to its count
        if (ourDate) {
          counts[goalId][ourDate] = (counts[goalId][ourDate] || 0) + 1;
        }
      }
    }

    return counts;
  }

  render() {
    // We use reversed days, because the scroll container for the checkboxes
    // is RTL, so that it starts scrolled at the right-hand side.
    const reversedDays = this.state.days;//.slice().reverse();
    const counts = this.getDayCounts();

    return (
      <div>
        <div className="daily-goal-list">
          <div className="daily-goal-list__left">
            {/* Include space where the header row will be in the right section */}
            <span className="spacer"></span>

            {/* Labels for each row */}
            {this.props.goals.map(goal => (
              <label>{goal.name}</label>
            ))}
          </div>
          <div className="daily-goal-list__right">
            {/* Include formatted dates for each day */}
            <span className="spacer">
              {reversedDays.map(date => (
                <span className="day-label">
                  <label>{this.formatDate(date)}</label>
                </span>
              ))}
            </span>
            {/* Create a row for each goal */}
            {this.props.goals.map(goal => (
              <div className="row">
                {/* Add a corresponding button column for each day */}
                {reversedDays.map(date => (
                  <button
                    key={date}
                    className={
                      (this.isToday(date) ? 'today' : '')
                      + (counts[goal.id][date] ? ' completed' : '')
                    }
                    onClick={() => this.props.onMarkDay(goal, date)}
                    onContextMenu={(e) => {e.preventDefault(); this.props.onUnmarkDay(goal, date)}}
                  >
                    {/* If no count exists, it is 0, and we show empty text */}
                    {/* If count is 1, show a check */}
                    {/* If count > 1, show the count */}
                    {!counts[goal.id][date]
                    ? <span>&nbsp;</span>
                    : (counts[goal.id][date] > 1
                      ? (<span>{counts[goal.id][date]}</span>)
                      : (<i className="fas fa-check"></i>))}
                  </button>
                ))}
              </div>
            ))}
            
          </div>
        </div>
        {/* <table
          className="daily-goal-list"
          cellPadding="0"
          cellSpacing="0"
          border="0"
        >
          <thead>
            <tr>
              <th></th>
              {this.state.days.map(date => (
                <th><span>{this.formatDate(date)}</span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.goals.map(goal => (
              <tr key={goal.id}>
                <td>
                  <span>{goal.name}</span>
                </td>
                {this.state.days.map(date => (
                  <td
                    key={date}
                    className={this.isToday(date) ? 'today' : ''}
                  >
                    <button>
                      <i className="fas fa-check"></i>
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    );
  }

}

export default DailyGoalList;