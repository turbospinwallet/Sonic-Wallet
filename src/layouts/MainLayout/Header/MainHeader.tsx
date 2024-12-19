import React from 'react';
import { APP_NAME } from '@/common/constants/const';
import TheHeader from '@/components/TheHeader';

const MainHeader = () => {
  return (
    <TheHeader>
      <div className="flex items-center">
        <h1 className="text-primary font-bold text-base md:text-3xl">{APP_NAME}</h1>
        <h1 className="uppercase font-medium text-3xl ml-4 sm:block hidden"></h1>
      </div>
    </TheHeader>
  );
};

export default MainHeader;
