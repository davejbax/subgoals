import React, { Component } from 'react';

import './DailyGoalHistory.scss';

class DailyGoalHistory extends Component {
  constructor(props) {
    super(props);

    this.getCount = this.getCount.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);

    const now = new Date();
    this.state = {
      year: now.getFullYear(),
      month: now.getMonth()
    };
  }

  getCount(date) {
    return this.props.data.history.map(
      dateString => new Date(dateString)
    ).filter(
      otherDate => otherDate.getFullYear() === date.getFullYear()
        && otherDate.getMonth() === date.getMonth()
        && otherDate.getDate() === date.getDate()
    ).length;
  }

  getCountClass(count, maxCount) {
    if (maxCount === 0) {
      return 'count-0';
    } else if (maxCount === 1) {
      // This looks slightly better if we only ever have one thing
      // (and also transitions well into when max count = 2, since ones that
      // were 1 before remain the same class)
      return count === 0 ? 'count-0' : 'count-6';
    } else {
      let num = Math.round(count / maxCount * 12);
      return `count-${num}`;
    }
  }

  generateRows(year, month) {
    let maxCount = 0;
    let rows = [];
    let row = [];
    let date = new Date(year, month);
    date.setDate(1);

    // Calculate the number of days before so we start on a Monday
    let daysBefore = (date.getDay() - 1) % 7;
    if (daysBefore < 0)
      daysBefore += 7;
    date.setDate(date.getDate() - daysBefore);

    for (let i = 0; i < 7 * 6; i++) {
      const count = this.getCount(date);

      // Add the day to the row
      row.push({
        date: new Date(date),
        count,
        isSelectedMonth: date.getMonth() === month
      });

      // Set max count if we have encountered a greater count
      if (count > maxCount) {
        maxCount = count;
      }

      // Push row if we fill it
      if (row.length === 7) {
        rows.push(row);
        row = [];
      }

      // Add one day
      date.setDate(date.getDate() + 1);
    }

    return {
      rows,
      maxCount
    };
  }

  getMonthString(year, month) {
    const date = new Date(year, month);

    // Get month string -- i.e. month & year
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  handleChangeMonth(amount) {
    let currentDate = new Date(this.state.year, this.state.month);
    currentDate.setMonth(currentDate.getMonth() + amount);

    this.setState({
      ...this.state,
      year: currentDate.getFullYear(),
      month: currentDate.getMonth()
    });
  }

  render() {
    const { rows, maxCount } = this.generateRows(this.state.year, this.state.month);
    const monthString = this.getMonthString(this.state.year, this.state.month);

    return (
      <div>
        <div className="month-select">
          <button onClick={() => this.handleChangeMonth(-1)}>
            <i className="fas fa-angle-left"></i>
          </button>
          <span>{monthString}</span>
          <button onClick={() => this.handleChangeMonth(+1)}>
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
        <table className="daily-month">
          <thead>
            <tr>
              <th>Mo</th>
              <th>Tu</th>
              <th>We</th>
              <th>Th</th>
              <th>Fr</th>
              <th>Sa</th>
              <th>Su</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr>
                {row.map(item => (
                  <td
                    className={
                      this.getCountClass(item.count, maxCount)
                      + (item.isSelectedMonth ? '' : ' disabled')
                    }
                    onClick={() => this.props.onMarkDay(item.date)}
                    onContextMenu={(e) => { e.preventDefault(); this.props.onUnmarkDay(item.date); }}
                  >
                    {item.date.getDate()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DailyGoalHistory;