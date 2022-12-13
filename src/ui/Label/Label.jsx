import './Label.css';
import React from 'react';

export function Label(props) {
  return (
    <label className="label" {...props}>
      <span className="label__text">{props.children}</span>
    </label>
  );
}
