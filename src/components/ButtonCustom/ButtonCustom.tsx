import type { ReactNode } from 'react';
import React from 'react';
import clsx from 'clsx';
import IconLoading from '@/components/IconLoading/IconLoading';

export type ButtonColor = 'secondary' | 'primary' | 'danger' | 'gray' | 'pink' | 'green';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonVariant = 'outlined' | 'filled' | 'empty';

const DIMENSIONS: Record<ButtonSize, string> = {
  xs: 'px-2 h-[28px] !border',
  sm: 'px-4 h-[42px]',
  md: 'px-4 h-[42px]',
  lg: 'px-3 sm:px-6 py-7',
} as const;

const SIZE: Record<ButtonSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-2xl font-bold',
} as const;

const FILLED = {
  default: 'disabled:pointer-events-none rounded-lg',
  primary: 'bg-primary hover:bg-primary/80 text-neutral disabled:bg-gray-1',
  secondary: 'bg-transparent border border-neutral/20 text-neutral hover:bg-neutral/5',
  danger: 'bg-red hover:bg-red/80 text-white disabled:bg-gray-1',
  gray: 'bg-gray-3 text-primary hover:bg-gray-4 hover:text-black',
  pink: 'bg-pink hover:bg-pink/80 text-white disabled:bg-gray-1',
  green: 'bg-green-2 hover:bg-green-2/80 text-white',
} as const;

const OUTLINED = {
  default: 'border-2 disabled:pointer-events-none disabled:opacity-40 rounded-full',
  primary: 'border-primary hover:bg-gray-4 text-primary',
  secondary: 'border-white text-white hover:border-primary hover:text-primary',
  gray: 'border-gray-3 text-gray-3 hover:bg-primary hover:text-gray-3',
  danger: 'border-red-1 hover:text-white hover:bg-red-1 text-red-1',
  green: 'border-green-2 hover:text-white hover:bg-green-2 text-green-2',
  pink: 'hover:bg-pink/80 text-white bg-pink',
} as const;

const EMPTY = {
  default:
    'bg-transparent hover:brightness-[90%] focus:brightness-[90%] active:brightness-[80%] disabled:pointer-events-none disabled:opacity-40',
  primary: 'hover:bg-primary/80 text-white hover:text-black',
  secondary: 'hover:bg-gray-800/80',
  danger: 'hover:bg-red-500/80 ',
  gray: 'hover:bg-gray-3/80 ',
  green: 'hover:bg-gray-3/80 ',
  pink: 'hover:bg-gray-3/80 ',
} as const;

const VARIANT = {
  outlined: OUTLINED,
  filled: FILLED,
  empty: EMPTY,
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: ButtonVariant;
  rounded?: boolean;
  loading?: boolean;
  sizeLoading?: string;
  onClick?: () => Promise<void> | void | Promise<any>;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      color = 'primary',
      sizeLoading = '20px',
      size = 'md',
      variant = 'filled',
      startIcon = undefined,
      endIcon = undefined,
      disabled,
      rounded,
      loading,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        type="button"
        {...rest}
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          VARIANT[variant].default,
          VARIANT[variant][color],
          SIZE[size],
          DIMENSIONS[size],
          'flex items-center justify-center gap-1 transition-colors',
          rounded && '!rounded-full',
          disabled && 'btn-shadow-disable',
          className
        )}
        onClick={onClick}
      >
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
        {loading && (
          <IconLoading
            stroke="currentColor"
            size={sizeLoading}
          />
        )}
      </button>
    );
  }
);

ButtonCustom.displayName = 'Button';

export default ButtonCustom;
