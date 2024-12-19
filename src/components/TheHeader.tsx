import type { PropsWithChildren } from 'react';
import React from 'react';
import { HEIGHT_HEADER } from '@/common/constants/const';

const TheHeader = ({ children }: PropsWithChildren<{}>) => {
  return (
    <header
      className="px-4 sm:px-2 flex justify-between items-center bg-transparent relative z-50"
      style={{
        minHeight: HEIGHT_HEADER,
      }}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center gap-x-2 flex-1 h-full">
        {children}
      </div>
    </header>
  );
};

export default TheHeader;
