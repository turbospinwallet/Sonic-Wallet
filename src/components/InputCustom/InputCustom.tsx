import { type ReactNode } from 'react';
import React from 'react';
import clsx from 'clsx';

export type InputSize = 'sm' | 'md';

export type InputColor = 'primary';

const SIZE: Record<InputSize, string> = {
  sm: 'h-[35px] px-3',
  md: 'h-[49px] px-3',
} as const;

const COLORS: Record<InputColor, string> = {
  primary: 'border-primary border',
} as const;

export interface InputProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  color?: InputColor;
  size?: InputSize;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  classNameContainer?: string;
}

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerProps,
      className = '',
      classNameContainer = '',
      color = 'primary',
      size = 'md',
      startIcon = undefined,
      endIcon = undefined,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {...containerProps}
        className={clsx(classNameContainer, 'flex items-center gap-3', SIZE[size], COLORS[color])}
      >
        {startIcon}
        <input
          ref={ref}
          {...rest}
          className={clsx('flex-1 bg-transparent', className)}
        />
        {endIcon}
      </div>
    );
  }
);

InputCustom.displayName = 'Button';

export default InputCustom;
