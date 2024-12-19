import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { LIST_MENU } from '@/common/constants/menu';

const Menu = () => {
  const { pathname } = useRouter();

  return (
    <div className="flex-1  flex  justify-center">
      {LIST_MENU.map((menu, index) => (
        <Link
          href={menu.route}
          key={index}
          className={clsx(
            'text-white text-xl font-medium flex items-center px-3',
            menu.activeRoute.includes(pathname) && '!text-primary bg-white-1'
          )}
        >
          {menu.title}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
