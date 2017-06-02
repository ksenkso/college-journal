import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calendarShowPopup, calendarSelectDay } from '../../../actions';

class CalendarDate extends Component {
    constructor(props) {
        super(props);
        this.selected = false;
    }

    onClick() {
      const { date } = this.props;
      this.props.calendarSelectDay(date.year, date.month, date.date, this._date);
    }

    render() {
       return (
         <div ref={date => this._date = date} onClick={this.onClick.bind(this)} className={this.props.date.date ? 'calendar__date' : 'calendar__mock'}>
           {this.props.date.date}
         </div>
       )
    }

}
const mapStateToProps = (state) => ({
  events: state.currentEvents
});

const mapDispatchToProps = {
  calendarShowPopup,
  calendarSelectDay
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDate);
