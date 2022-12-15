import { ReactNode } from 'react';
import ReactPlaceholder from 'react-placeholder';

type Props<T> = {
  data: T;
  children: ReactNode | ((data: NonNullable<T>) => ReactNode);
  rows?: number;
};

export function Placeholder<T>(props: Props<T>) {
  return (
    <ReactPlaceholder ready={props.data !== null} rows={props.rows as any} {...props}>
      {props.data !== null && props.data !== undefined
        ? typeof props.children === 'function'
          ? props.children(props.data)
          : props.children
        : null}
    </ReactPlaceholder>
  );
}

// <div>{() => <span />}</div>
