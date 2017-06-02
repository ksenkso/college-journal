import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../helpers';
import { setActiveModel, calendarPostEvent } from '../../actions';
import ModelEditorFactory from '../ModelEditorFactory';

class EventForm extends Component {
    constructor(props) {

      super(props);

      this.names = {
        "Event[caption]": 'Заголовок',
        "Event[description]": 'Описание',
        "Event[e_type_id]": 'Тип события',
        "Event[start_date]": 'Дата начала',
        "Event[start_time]": 'Время начала',
        "Event[end_date]": 'Дата окончания',
        "Event[end_time]": 'Время окончания',
        "Event[dtype_1]": 'Test type'
      };
      this.requiredFields = {
        "Event[caption]": true,
        "Event[description]": true,
        "Event[e_type_id]": false,
        "Event[start_date]": true,
        "Event[start_time]": true,
        "Event[end_date]": true,
        "Event[end_time]": true,
        "Event[dtype_1]": false

      };
      this.types = {
        "Event[caption]": ['text'],
        "Event[description]": ['textarea'],
        "Event[e_type_id]": ['select', [{name: 'Напоминание', value: 1}, {name: 'Встреча', value: 2}]],
        "Event[start_date]": ['date'],
        "Event[start_time]": ['time'],
        "Event[end_date]": ['date'],
        "Event[end_time]": ['time'],
        "Event[dtype_1]": ['checkbox']

      };
    }

    componentWillMount() {
      this.props.setActiveModel({meta: [], names: this.names});
    }

    componentDidUpdate() {

      this.props.setActiveModel({fields: {}, names: this.names});
  }

    render() {
      const {event} = this.props;
      let start_date, end_date, start_time, end_time;
      if (event !== undefined) {

        start_date = start_date && formatDate(new Date(event.start_date), 'yyyy-mm-dd');
        start_time = event.start_time;

        end_date = end_date && formatDate(new Date(event.end_date), 'yyyy-mm-dd');
        end_time = event.end_time;
      }


      return (
        <ModelEditorFactory
          modelName="Событие"
          names={this.names}
          rules={{}}
          required={this.requiredFields}
          canAddMeta={true}
          mode="create"
          types={this.types}
          submitCallback={this.props.calendarPostEvent}
        />
      );
       /*return (
         <form action={event ? `/api/public/events/${event.event_id}` : '/api/public/events'} className="form --event" method={event ? 'PUT' : 'POST'}>
           <fieldset>
             <label htmlFor="caption">Заголовок</label>
             <input type="text" id="caption" name="caption" defaultValue={event && event.caption} required/>
           </fieldset>
           <fieldset>
             <label htmlFor="description">Описание</label>
             <textarea id="description" name="description" defaultValue={event && event.description}/>
           </fieldset>
           <fieldset>
             <label htmlFor="e_type_id">Вид события</label>
             <select id="e_type_id" name="e_type_id" defaultValue={event && event.e_type_id}>
               <option value="1">Напоминание</option>
               <option value="2">Встреча</option>
             </select>
           </fieldset>
           <fieldset>
             <label htmlFor="start_date">Дата начала</label>
             <input type="date" id="start_date" name="start_date" defaultValue={start_date} required />
             <label htmlFor="start_time">Время начала</label>
             <input type="time" id="start_time" name="start_time" defaultValue={start_time} required/>
           </fieldset>
           <fieldset>
             <label htmlFor="end_date">Дата конца</label>
             <input type="date" id="end_date" name="end_date" defaultValue={end_date} required/>
             <label htmlFor="end _time">Время конца</label>
             <input type="time" id="end_time" name="end_time" defaultValue={end_time} required/>
           </fieldset>
           <fieldset>
             <h4>Добавить в документы:</h4>
             {
               this.props.ready.dTypes && this.props.dTypes.ids
                 .map(dTypeId => (
                   <Checkbox input={{
                     name: this.props.dTypes.byId[dTypeId].name,
                     key: `dtype_${dTypeId}`,
                     checked: event && event.dTypes.some(dtype => dtype.d_type_id === dTypeId)
                   }} />
                 ))
             }
           </fieldset>
           <CustomField showValues={this.props.event !== undefined} metaFields={this.props.model.meta} />
         </form>
       )*/
    }

}
const mapStateToProps = (state) => ({
  selectedDate: state.calendar.selectedDate,
  dTypes: state.dTypes,
  ready: state.ready
});



export default connect(mapStateToProps, {setActiveModel, calendarPostEvent})(EventForm);

export const EditEvent = ({event}) => ( <EventForm event={event} /> );

