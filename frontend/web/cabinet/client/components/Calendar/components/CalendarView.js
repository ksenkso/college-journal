import React, { Component } from 'react';
import CalendarDate from './CalendarDate';
import { connect } from 'react-redux';
import { calendarSelectDay } from '../../../actions'

class CalendarView extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
      $('.calendar__date.selected').removeClass('selected');
      const d = new Date();
      this.props.calendarSelectDay(this.props.currentYear, this.props.currentMonth, d.getDate(), $('.calendar__date').filter((i, e) => $(e).text() == d.getDate()));
    }

    componentDidUpdate() {
      $('.calendar__view').height((~~($('.view__container').children().length / 7) + 1) * 80);
    }

    render() {
       return (
         <div className="calendar__view">
           <div className="view__container">
             {this.props.currentDays.map((date, i) => <CalendarDate date={{date, year: this.props.currentYear, month: this.props.currentMonth}} key={i} />)}
           </div>
         </div>
       )
    }

}
const mapStateToProps = (state) => ({
    currentDays: state.calendar.currentDays,
    currentDay: state.calendar.currentDay,
    currentYear: state.calendar.currentYear,
    currentMonth: state.calendar.currentMonth,
    selectedDate: state.calendar.selectedDate
});


export default connect(mapStateToProps, { calendarSelectDay })(CalendarView);
