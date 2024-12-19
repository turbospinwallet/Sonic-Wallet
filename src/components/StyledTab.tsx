import { Tab } from '@headlessui/react';
import type { ComponentProps, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Fragment } from 'react';

export type StyledTabProps = Exclude<ComponentProps<typeof Tab>, 'children'>;

function StyledTab({ children, className, ...props }: PropsWithChildren<StyledTabProps>) {
  return (
    <Tab
      as={Fragment}
      {...props}
    >
      {({ selected }) => {
        return (
          <div
            className={clsx(
              'px-4 py-3 font-semibold text-sm border-l border-primary text-left min-w-[120px] md:min-w-[160px]',
              selected ? 'bg-tab-active' : 'bg-tab',
              className
            )}
          >
            {children}
          </div>
        );
      }}
    </Tab>
  );
}

export default StyledTab;
