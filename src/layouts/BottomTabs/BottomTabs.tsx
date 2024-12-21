import { useRouter } from 'next/router';
import React from 'react';
import { FiHome, FiUsers } from 'react-icons/fi';
import { IoGameController } from 'react-icons/io5';
import clsx from 'clsx';

const tabs = [
  {
    label: 'Home',
    icon: FiHome,
    path: '/dapp/wallet',
    enabled: true,
  },
  {
    label: 'Game',
    icon: IoGameController,
    path: '/dapp/claim',
    enabled: false,
  },
  {
    label: 'Frens',
    icon: FiUsers,
    path: '/dapp/frens',
    enabled: false,
  },
];

const BottomTabs = () => {
  const router = useRouter();
  const { pathname } = router;

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.enabled) {
      void router.push(tab.path);
    } else {
      void router.push('/dapp/coming-soon');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-secondary border-t border-neutral/10">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <button
              key={tab.path}
              className={clsx(
                'flex flex-col items-center py-3 px-6',
                isActive ? 'text-primary' : 'text-neutral/70',
                !tab.enabled && 'opacity-50'
              )}
              onClick={() => handleTabClick(tab)}
            >
              <tab.icon size={24} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabs;
