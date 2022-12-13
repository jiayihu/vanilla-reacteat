import './Button.css';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export function Button(props) {
  const {
    active,
    block,
    circle,
    className: overrideClassName,
    children,
    large,
    ...btnProps
  } = props;
  const className = classnames('btn btn-primary', {
    'btn-lg': large,
    'btn-block': block,
    'btn--circle': circle,
    [overrideClassName]: overrideClassName,
  });

  return (
    <button type="button" className={className} {...btnProps}>
      {children}
    </button>
  );
}

Button.propTypes = {
  block: PropTypes.bool,
  circle: PropTypes.bool,
  className: PropTypes.string,
  large: PropTypes.bool,
};
