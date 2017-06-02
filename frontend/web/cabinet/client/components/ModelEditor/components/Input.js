/**
 * Created by yazun on 03.12.2016.
 */
import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
         <input
           id={this.props.input.key}
           name={this.props.input.key}
           type={this.props.input.type}
           defaultValue={String(this.props.input.value)}
           required={this.props.input.required}
         />
       );
    }

}

export default Input;
