/**
 * Created by yazun on 30.11.2016.
 */
import React, { Component } from 'react';
import Link from 'react-router/lib/Link';
import EventForm from '../../EventForm';
import { leftpad } from '../../../helpers';
import { calendarDeleteEvent, calendarEditEvent, showDialog } from '../../../actions';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

class ModalEvent extends Component {

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
          data.event_id = self.props.event.event_id;
          data.dTypes = [];
          inputs.forEach(input => {
            if (input.name.indexOf('dtype_') !== -1) {
              delete data[input.name];
              data.dTypes.push(parseInt(input.name.substr(6)));
            }
          });
          console.log(data);
          self.props.calendarEditEvent(data, dialogId);
          /*$.ajax({
            type: 'POST',
            url: `/api/public/events`,
            data,
            success(res) {
              const d = new Date(self.props.currentDate);
              self.props.calendarFetchEvents(d.getFullYear(), d.getMonth());
              self.props.hideDialog(dialogId);
            },
            error(e) {
              console.error(e);
            }

          })*/
        }
      },
      {
        text: 'Отменить'
      }
    ];
    this.props.showDialog({
      title: 'HELLO',
      content: (<EventForm event={this.props.event}/>),
      buttons,
      id: dialogId
    })
  }

  toggleDescription() {
    $(this._el).find('.event__description').slideToggle();
  }

  getEventType() {
    let typeClass = "event__type--";
    switch (this.props.event.e_type_id) {
      case 1: {
        typeClass += "default";
        break;
      }
      case 2: {
        typeClass += "meeting";
        break;
      }
      default: {
        typeClass += "default";

      }
    }
    return (<div className={`event__type ${typeClass}`}>{this.props.event.type}</div>)
  }

  render() {
    const startDate = new Date(this.props.event.start_date);
    const endDate = new Date(this.props.event.end_date);
    const endTime = this.props.event.end_time.substr(0, 5);
    const startTime = this.props.event.start_time.substr(0, 5);
    const date = leftpad(endDate.getDate(), '0', 2);
    const month = leftpad(endDate.getMonth(), '0', 2);
    return (
      <div className="event" ref={element => this._el = element}>
        <div className="event__container">
          <div className="event__header" onClick={this.toggleDescription.bind(this)}>
            <div className="event__title">
              <div className="event__caption">{this.props.event.caption}</div>
              {this.getEventType()}
            </div>
            <div className="event__start">{`${startTime} - ${+startDate == +endDate ? endTime : `${date}.${month}.${endDate.getFullYear()} ${endTime}`}`}</div>
          </div>
          <div className="event__actions">
            <div className="glyphicon glyphicon-edit" onClick={this.showEventEditor.bind(this)}></div>
            <div onClick={this.props.calendarDeleteEvent.bind(this, this.props.event.event_id)} className="glyphicon glyphicon-remove"></div>
          </div>
        </div>
        <div className="event__description">
          {this.props.event.description}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  calendarDeleteEvent,
  calendarEditEvent,
  showDialog
};

export default connect(null, mapDispatchToProps)(ModalEvent);
