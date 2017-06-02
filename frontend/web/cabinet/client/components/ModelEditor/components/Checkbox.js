/**
 * Created by yazun on 12.01.2017.
 */
import React from 'react';
/**
 *
 * @param {Object} props
 * @param {Object} props.input
 * @return {XML}
 * @constructor
 */
const Checkbox = (props) => {
    return (
        <span className="input">
          <input
            name={props.input.key}
            id={props.input.key}
            type="checkbox"
            className="input__checkbox"
            defaultChecked={props.input.checked}
          />
        </span>
    )
};
export default Checkbox;
