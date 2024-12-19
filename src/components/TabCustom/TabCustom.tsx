import type { ReactNode } from 'react';
import React from 'react';
import clsx from 'clsx';

interface TabCustomProps {
  children: ReactNode;
  active: boolean;
  className?: string;
  onClick?: () => void;
}

const TabCustom = ({ children, active, className, onClick }: TabCustomProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        active ? 'bg-tab-active' : 'bg-tab',
        'font-semibold text-sm h-11 border-primary border-l px-5 flex items-center cursor-pointer hover:bg-tab-active',
        className
      )}
    >
      {children}
    </div>
  );
};

export default TabCustom;
