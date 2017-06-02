/**
 * Created by yazun on 03.12.2016.
 */
import React, { Component } from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import Checkbox from './Checkbox';
import Datepicker from './Datepicker';
import Timepicker from './Timepicker';


class FormField extends Component {
    constructor(props) {
        super(props);
    }

    chooseInput(field) {
      switch (field.type) {
        case 'input' :
        case 'password':
        case 'hidden':
        case 'customField':
          return <Input input={field} />;
          break;
        case 'checkbox':
          return <Checkbox input={field} />;
          break;
        case 'time':
          return <Timepicker input={field} />;
          break;
        case 'date':
          return <Datepicker input={field} />;
          break;
        case 'textarea':
          return <TextArea input={field} />;
          break;
        case 'select':
          return <Select input={field} />;
        default: return <Input input={field} />;
      }
    }

    render() {
      return this.props.field.type === 'hidden' ? <Input input={this.props.field}/> : (
        <fieldset>
          <label htmlFor={this.props.field.key}>{this.props.field.name}</label>
          {this.chooseInput(this.props.field)}
        </fieldset>
      )
    }

}

export default FormField;
