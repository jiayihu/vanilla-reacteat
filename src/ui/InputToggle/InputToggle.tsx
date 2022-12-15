import './InputToggle.css';

import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

type Props = {
  id: string;
  children: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputToggle(props: Props) {
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
