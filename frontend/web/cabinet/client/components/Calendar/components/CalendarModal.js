/**
 * Created by yazun on 24.11.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalEvent from './ModalEvent';
import ActionButton from '../../../components/ActionButton';
import EventForm, { EditEvent } from '../../EventForm';
import { v4 } from 'uuid';
import { calendarShowPopup, showDialog, hideDialog, calendarPostEvent, setActiveModel } from '../../../actions';

class CalendarModal extends Component {
    constructor(props) {
        super(props);
    }

    showEventEditor() {
      const dialogId = v4();
      const self = this;
      const buttons = [
        {
          text: 'Создать',
          handler(e) {
            let data = {};
            const inputs = $('.form.--event').serializeArray();
            inputs.forEach(input => data[input.name] = input.value);
            data.start_date = +new Date(`${data.start_date} 00:00:00`);
            data.end_date = +new Date(`${data.end_date} 00:00:00`);
            data.dTypes = [];
            inputs.forEach(input => {
              if (input.name.indexOf('dtype_') !== -1) {
                delete data[input.name];
                data.dTypes.push(parseInt(input.name.substr(6)));
              }
            });
            console.log(data);
            self.props.calendarPostEvent(data, dialogId);
          }
        },
        {
          text: 'Отменить'
        }
      ];
      this.props.showDialog({
        title: 'Добавление события',
        content: (<EventForm/>),
        buttons,
        id: dialogId
      })
    }

    render() {
      const {events} = this.props;
      console.log('EVENTS:', events);
      const currentEvents = events.ids.filter(id => events.byId[id].start_date >= this.props.currentDate && events.byId[id].end_date <= (this.props.currentDate + 24 * 60 * 60 * 1000));
      console.log(currentEvents);
       return (
        <div className="calendar__modal">
            <h3 className="modal__title">События</h3>
            <div className="modal__events">
              {
                currentEvents.length
                  ? currentEvents.map(eventId => <ModalEvent event={events.byId[eventId]} />)
                  : "В этот день не назначено событий"
              }
            </div>
          <ActionButton onClick={this.showEventEditor.bind(this, false)}>Добавить событие</ActionButton>
        </div>
       )
    }
}
const mapStateToProps = (state) => ({
    events: state.calendar.currentEvents,
    currentDate: state.calendar.selectedDate,
});

const mapDispatchToProps = {
  calendarShowPopup,
  showDialog,
  hideDialog,
  calendarPostEvent,
  setActiveModel
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarModal);
