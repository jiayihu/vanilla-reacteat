import './InputToggle.css';

import React from 'react';
import PropTypes from 'prop-types';

export function InputToggle(props) {
  const { id, children, ...inputProps } = props;

  return (
    <div className="custom-control custom-switch">
      <input type="checkbox" className="custom-control-input" id={id} {...inputProps} />
      <label className="custom-control-label" htmlFor={props.id}>
        {children}
      </label>
    </div>
  );
}

InputToggle.propTypes = {
  id: PropTypes.string.isRequired,
};
