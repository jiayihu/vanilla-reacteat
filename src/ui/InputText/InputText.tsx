import React from 'react';
import './InputText.css';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function InputText(props: Props) {
  return <input type="input" className="input-text form-control" {...props} />;
}
