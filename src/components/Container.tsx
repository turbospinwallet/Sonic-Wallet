import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx('w-full x-4 sm:px-2 max-w-[1327px] px-2 md:px-4', className)}>
      {children}
    </div>
  );
}

export default Container;
