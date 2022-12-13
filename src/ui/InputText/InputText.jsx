import './InputText.css';
import React from 'react';

export function InputText(props) {
  return <input type="input" className="input-text form-control" {...props} />;
}

InputText.propTypes = {};
