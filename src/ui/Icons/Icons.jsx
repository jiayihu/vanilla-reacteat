import React from 'react';
import PropTypes from 'prop-types';
import bootstrapSvg from 'bootstrap-icons/bootstrap-icons.svg';

export function Icons(props) {
  const { name, ...svgProps } = props;

  return (
    <svg className="bi" width="24" height="24" fill="currentColor" {...svgProps}>
      <use xlinkHref={`${bootstrapSvg}#${name}`} />
    </svg>
  );
}

Icons.propTypes = {
  name: PropTypes.string.isRequired,
};
