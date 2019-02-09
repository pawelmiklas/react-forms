import React from 'react';
import './Label.css';

const Label = (props) => {
    return ( 
        <label htmlFor={props.id}>{props.children}
            <input
              className={props.class}
              type={props.type}
              id={props.id}
              value={props.value}
              onChange={props.change}
            />
            {!props.label ? <p className="error">{props.error}</p> : null}
          </label>
     );
}
 
export default Label;