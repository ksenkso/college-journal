/**
 * Created by yazun on 03.12.2016.
 */
import React, { Component } from 'react';

class TextArea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return this.props.input.required
        ? <textarea id={this.props.input.key} name={this.props.input.key} defaultValue={this.props.input.value} />
        : <textarea id={this.props.input.key} name={this.props.input.key} defaultValue={this.props.input.value} required="required" />
    }

}

export default TextArea;
