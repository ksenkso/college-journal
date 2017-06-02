/**
 * Created by yazun on 23.11.2016.
 */
import React, { Component } from 'react';

class CalendarSelect extends Component {
    constructor(props) {
        super(props);
        this.currentIndex = this.props.defaultIndex;
        this.currentValue = this.props.values[this.currentIndex];
    }

    onNextClick() {
      if (this.currentIndex >= this.props.values.length - 1) return;
      this.currentIndex++;
      this.currentValue = this.props.values[this.currentIndex];
      this.props.onClick(this.currentIndex);
    }

    onPrevClick() {
      if (!this.currentIndex) return;
      this.currentIndex--;
      this.currentValue = this.props.values[this.currentIndex];
      this.props.onClick(this.currentIndex);
    }

    render() {
       return (
        <div className="calendar__select">
            <i className="material-icons select__control control--prev" onClick={this.onPrevClick.bind(this)}>keyboard_arrow_left</i>
            <div className="select__value">{this.currentValue}</div>
            <i className=" material-icons select__control control--next" onClick={this.onNextClick.bind(this)}>keyboard_arrow_right</i>
        </div>
       )
    }

}

export default CalendarSelect;
