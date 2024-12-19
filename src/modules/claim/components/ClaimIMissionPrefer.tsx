import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ClaimMissionModal from './ClaimMissionModal/ClaimMissionModal';
import ClaimPreferModal from './ClaimPreferModal';

const ClaimIMissionPrefer = () => {
  const query = useSearchParams();
  const [isOpenModal, setisOpenModal] = useState<1 | 2 | undefined>();
  const onClose = () => {
    setisOpenModal(undefined);
  };

  useEffect(() => {
    const type = query.get('type');
    if (type) {
      if (['earn', 'leaderboard'].includes(type)) {
        setTimeout(() => {
          setisOpenModal(1);
        }, 700);
      }
    }
  }, [query.get('type')]);

  return (
    <div className="flex justify-center mt-8 gap-8">
      <button onClick={() => setisOpenModal(() => 1)}>
        <Image
          src="/images/earn.png"
          alt="earn.png"
          width={95}
          height={65}
          onClick={() => setisOpenModal(() => 1)}
        />
      </button>
      <button onClick={() => setisOpenModal(2)}>
        <Image
          className="cursor-pointer"
          src="/images/prefer.png"
          alt="prefer.png"
          width={95}
          height={65}
        />
      </button>
      <ClaimMissionModal
        isOpen={isOpenModal === 1}
        onClose={onClose}
        type={query.get('type') as string}
      />
      <ClaimPreferModal
        isOpen={isOpenModal === 2}
        onClose={onClose}
      />
    </div>
  );
};

export default ClaimIMissionPrefer;
