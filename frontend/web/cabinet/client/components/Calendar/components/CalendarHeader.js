import React, { Component } from 'react';

class CalendarHeader extends Component {
    constructor(props) {
        super(props);

    }

    render() {
       return (
        <div className="calendar__header">
          <div className="calendar__weekday">Пн</div>
          <div className="calendar__weekday">Вт</div>
          <div className="calendar__weekday">Ср</div>
          <div className="calendar__weekday">Чт</div>
          <div className="calendar__weekday">Пт</div>
          <div className="calendar__weekday">Сб</div>
          <div className="calendar__weekday">Вс</div>
        </div>
       )
    }

}

export default CalendarHeader;
