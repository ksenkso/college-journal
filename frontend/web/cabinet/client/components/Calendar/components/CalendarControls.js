/**
 * Created by yazun on 23.11.2016.
 */
import React, { Component } from 'react';
import CalendarSelect from './CalendarSelect';
import { calendarChangeMonth, calendarChangeYear, calendarFetchEvents } from '../../../actions';
import { connect } from 'react-redux';

const mapMonthStateToProps = (state) => ({
  values: state.calendar.months,
  defaultIndex: state.calendar.currentMonth,

});
const mapMonthDispatchToProps = (dispatch) => ({
  onClick(month) {
    dispatch(calendarChangeMonth(month));
  }
});

const mapYearToProps = (state) => ({
  values: state.calendar.years,
  defaultIndex: state.calendar.currentYearIndex
});
const mapDispatchYearToProps = (dispatch) => ({
  onClick(year) {
    dispatch(calendarChangeYear(year));
  }
});

const MonthSelect = connect(mapMonthStateToProps, mapMonthDispatchToProps)(CalendarSelect);
const YearSelect = connect(mapYearToProps, mapDispatchYearToProps)(CalendarSelect);
const CalendarControls = (props) => {
    return (
        <div className="calendar__controls">
          <MonthSelect />
          <YearSelect />
        </div>
    )
};

export default CalendarControls;

