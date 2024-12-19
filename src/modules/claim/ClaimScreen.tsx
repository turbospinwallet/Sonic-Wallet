import React from 'react';
import Image from 'next/image';
import ClaimHeader from './components/ClaimHeader';
import ClaimItemsLevelup from './components/ClaimItemsLevelup';
import ClaimIMissionPrefer from './components/ClaimIMissionPrefer';
import ClaimLevelUpModal from './components/ClaimLevelUpModal';
import ClaimCountdown from './components/ClaimCountdown';

const ClaimScreen = () => {
  return (
    <div className="h-screen flex flex-col relative text-secondary-900 overflow-hidden">
      <Image
        src="/images/claim-bg-top.png"
        alt="claim-bg-top"
        fill
        objectFit="contain"
        objectPosition="top"
        className="-z-10"
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 -z-10">
        <Image
          src="/images/claim-bg-bottom.png"
          alt="claim-bg-bottom"
          fill
          objectFit="contain"
          objectPosition="bottom"
        />
      </div>
      <div className="flex-[3] flex flex-col justify-between">
        <ClaimHeader />
        <ClaimCountdown />
      </div>
      <div className="flex-[2] pb-4">
        <ClaimItemsLevelup />
        <ClaimIMissionPrefer />
      </div>
      <ClaimLevelUpModal />
    </div>
  );
};

export default ClaimScreen;
