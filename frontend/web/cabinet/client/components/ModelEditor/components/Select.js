import React, { Component } from 'react';
import { v1 } from 'uuid';

class Select extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
         <select name={this.props.input.key} id={this.props.input.key}>
           {this.props.input.value && this.props.input.value.map(option => <option key={v1()} value={option.value}>{option.name}</option>)}
         </select>
       )
    }

}

export default Select;
