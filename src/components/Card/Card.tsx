import React from 'react';
import clsx from 'clsx';

export type CardColor = 'primary' | 'secondary';

const COLORS: Record<CardColor, string> = {
  primary: 'bg-secondary border border-primary-2 rounded-[20px] card-shadow',
  secondary: 'bg-primary-3 rounded-[10px]',
} as const;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: CardColor;
  className?: string;
  children?: React.ReactNode;
}

const Card = ({ color = 'primary', className, children, ...props }: CardProps) => {
  return (
    <div
      className={clsx(COLORS[color], className, 'p-2 sm:p-4 ')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
