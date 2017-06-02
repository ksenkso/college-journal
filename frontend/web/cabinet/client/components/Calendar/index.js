/**
 * Created by yazun on 23.11.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTitle, calendarFetchEvents, getDocumentTypes } from '../../actions';
import CalendarView from './components/CalendarView';
import CalendarHeader from './components/CalendarHeader';
import CalendarControls from './components/CalendarControls';
import CalendarModal from './components/CalendarModal';

class Calendar extends Component {
    constructor(props) {
        super(props);
        const currentDate = new Date();
        this.defaults = this.props.calendar
    }

  componentWillUpdate() {
    this.props.changeTitle("Календарь");
  }

  componentWillMount() {
      this.props.getDocumentTypes();
  }

  componentDidMount() {
    this.props.calendarFetchEvents(this.props.calendar.currentYear, this.props.calendar.currentMonth);
    this.props.changeTitle("Календарь");
  }

    render() {
       return (
        <div className="calendar">
          <div className="calendar__container">
            <CalendarControls
              defaultMonth={this.defaults.currentMonth}
              defaultYear={this.defaults.years.indexOf(this.defaults.currentYear)}
              months={this.defaults.months}
              years={this.defaults.years}
            />
            <CalendarHeader />
            <CalendarView />
          </div>
          <CalendarModal />
          {/*<CalendarFooter />*/}
        </div>
       )
    }

}
const mapStateToProps = (state) => ({
  calendar: state.calendar,
  title: state.title
});

const mapDispatchToProps = {
  changeTitle,
  calendarFetchEvents,
  getDocumentTypes
};

 export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
