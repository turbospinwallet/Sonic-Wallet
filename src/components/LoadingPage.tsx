import Image from 'next/image';
import React from 'react';
import { APP_NAME } from '@/common/constants/const';

const LoadingPage = () => {
  return (
    <div className="h-screen flex items-center justify-center px-6 overflow-hidden">
      <Image
        src="/images/bg-auth.png"
        alt="bg-auth.png"
        fill
        objectFit="fill"
        objectPosition="center"
        className="-z-10"
      />
      <div className="text-center flex flex-col gap-10">
        <Image
          src="/images/logo-1.svg"
          alt="bg-auth.png"
          width={240}
          height={180}
          className="mx-auto"
        />
        <div>
          <h1 className="text-yellow-400 text-3xl font-bold mb-8">{APP_NAME} Wallet</h1>
          <p className="text-yellow-400 animate-[ping_2s_cubic-bezier(0.4,0,1,0.21)_infinite]">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
