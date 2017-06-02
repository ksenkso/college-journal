/**
 * Created by yazun on 15.01.2017.
 */
import React from 'react';

const Timepicker = (props) => {
  return (
    <input
      id={props.input.key}
      name={props.input.key}
      type="time"
      defaultValue={String(props.input.value)}
      required={props.input.required}
    />
  )
};

export default Timepicker;
