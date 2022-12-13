import React from 'react';
import PropTypes from 'prop-types';
import ReactPlaceholder from 'react-placeholder';

export function Placeholder(props) {
  return (
    <ReactPlaceholder {...props}>
      {props.ready
        ? typeof props.children === 'function'
          ? props.children()
          : props.children
        : null}
    </ReactPlaceholder>
  );
}

Placeholder.propTypes = {
  ready: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['text', 'media']),
  rows: PropTypes.number,
};
