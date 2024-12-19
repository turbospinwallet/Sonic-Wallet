import type { ReactElement, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import SvgChevronDown from '@/components/SvgIcons/SvgChevronDown';

interface DropdownProps {
  menu: ReactElement | string;
  children: ReactNode;
  className?: string;
  classNameMenu?: string;
  classNameMenuItem?: string;
  onClick?: () => void;
  bsPrefixMenu?: string;
  hasArrow?: boolean;
  sizeArrow?: number;
}

const DropdownHover = ({
  menu,
  children,
  className,
  classNameMenu,
  classNameMenuItem,
  onClick,
  bsPrefixMenu,
  hasArrow = true,
  sizeArrow = 10,
}: DropdownProps) => {
  return (
    <Menu
      as="div"
      className={clsx('relative inline-block', className)}
    >
      <Menu.Button
        className={clsx(
          bsPrefixMenu || ' w-full shadow-sm focus:outline-none focus:boxShadow:none',
          classNameMenu
        )}
      >
        <div
          className="flex items-center gap-x-2 justify-center"
          onClick={onClick}
        >
          {menu}
          {hasArrow && (
            <SvgChevronDown
              className="ml-2 w-[18px] md:w-[26px] h-[10px] md:h-[13px]"
              width={sizeArrow}
              height={sizeArrow}
            />
          )}
        </div>
      </Menu.Button>

      <Transition
        as="div"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          static
          className={clsx(
            'origin-top-left !p-0 absolute right-0  w-full rounded-none  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50'
          )}
        >
          <div className={clsx(classNameMenuItem, 'w-full mt-5')}>
            <div>{children}</div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropdownHover;
