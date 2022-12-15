import classnames from 'classnames';
import React, { ReactNode } from 'react';
import './Button.css';

type BasicButton = {
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
type Props =
  | (BasicButton & { variant: 'basic' })
  | (BasicButton & { variant: 'block'; large?: boolean })
  | (BasicButton & { variant: 'circle' });

export function Button(props: Props) {
  const { variant, className: overrideClassName = '', children, ...btnProps } = props;
  const className = classnames('btn btn-primary', {
    'btn-lg': variant === 'block' && props.large,
    'btn-block': variant === 'block',
    'btn--circle': variant === 'circle',
    [overrideClassName]: overrideClassName,
  });

  const buttonProps = omit(btnProps, 'large');

  return (
    <button type="button" className={className} {...buttonProps}>
      {children}
    </button>
  );
}

function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  excludedKey: string,
): Omit<T, K> {
  return Object.fromEntries(Object.entries(obj).filter(([key]) => key !== excludedKey)) as Omit<
    T,
    K
  >;
}

// Form -> Register / Login
// { isRegister: boolean, isLogin: boolean, name?: string, surname?: string, email: string, password: string }
// { isRegister: true, isLogin: true, name: "", surname: "" }
// setState({ ...state, isLogin: false, isRegister: true })
// setState({ ...state, isLogin: true, isRegister: false })
// | { kind: "REGISTER", name: string, surname: string, email: string, password: string }
// | { kind: "LOGIN", email: string, password: string }
