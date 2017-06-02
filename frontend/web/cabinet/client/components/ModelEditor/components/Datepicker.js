/**
 * Created by yazun on 15.01.2017.
 */
import React from 'react';

const Datepicker = (props) => {
  return (
    <input
      id={props.input.key}
      name={props.input.key}
      type="date"
      defaultValue={String(props.input.value)}
      required={props.input.required}
    />
  )
};

export default Datepicker;
