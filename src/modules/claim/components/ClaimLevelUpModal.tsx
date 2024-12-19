import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import IconLoading from '@/components/IconLoading/IconLoading';
import { useModalState } from '@/modules/shared/state/modal-state';

const ClaimLevelUpModal = () => {
  const { upgradeModal, closeUpgradeModal } = useModalState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await upgradeModal?.item?.onSubmit?.();
    } catch (e) {
      // noop
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        'h-full w-full absolute top-0 left-0 transition-all flex flex-col',
        upgradeModal?.isOpen ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div
        className="h-full w-full absolute top-0 left-0 -z-10"
        onClick={closeUpgradeModal}
      />
      {upgradeModal?.item ? (
        <div className="bg-yellow-1 mt-auto min-h-[200px] rounded-t-3xl overflow-hidden">
          <div className="text-xl font-bold text-center py-5 shadow-md bg-yellow-50">
            {upgradeModal?.item?.title}
          </div>
          <div className="py-2 pb-8">
            <p className="text-center font-bold">{upgradeModal?.item?.desc}</p>

            <div className="px-6 mt-12  flex items-center relative">
              <div className="p-1 border-secondary-900 inline-block rounded-lg border-4 bg-yellow-50">
                <div className="relative h-[60px] w-[60px]">
                  {upgradeModal?.item?.icon?.src ? (
                    <Image
                      src={upgradeModal?.item?.icon?.src}
                      alt={upgradeModal?.item?.icon?.alt}
                      fill
                      objectFit="contain"
                      className="z-0"
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="p-1 px-2 text-sm border border-gray-100 inline-block bg-white rounded absolute -top-10 left-2 font-bold">
                  {upgradeModal?.item?.level}
                </div>
                {upgradeModal?.item?.note && (
                  <div className="p-1 px-2 text-sm border border-gray-100 inline-block bg-white rounded absolute -top-10 right-0 font-bold">
                    {upgradeModal?.item?.note}
                  </div>
                )}

                <div className="border-4 border-white h-7 w-full border-l-0 shadow-inner bg-secondary-200 rounded-r-full">
                  <div
                    className="h-full bg-secondary-900 rounded-r-full"
                    style={{ width: `${upgradeModal?.item?.value}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={closeUpgradeModal}
                disabled={isLoading}
              >
                <Image
                  src="/images/btn-cancel.png"
                  alt="btn-cancel.png"
                  height={28}
                  width={76}
                  className=""
                />
              </button>
              <button
                className={clsx(
                  'relative min-w-[100px] flex justify-center px-4 items-center',
                  upgradeModal.item.disabled && 'hidden'
                )}
                onClick={handleSubmit}
                disabled={isLoading || upgradeModal.item.disabled}
              >
                <Image
                  src="/images/btn-blank.png"
                  alt="btn-blank.png"
                  fill
                  objectFit="contain"
                  className="z-0"
                />
                {upgradeModal.item.isSui ? (
                  <Image
                    src={'/images/sui.svg'}
                    alt={'sui token'}
                    height={24}
                    width={24}
                    className="z-10"
                  />
                ) : (
                  <Image
                    src={'/images/gold-ore.png'}
                    alt={'/images/gold-ore.png'}
                    height={24}
                    width={24}
                    className="z-10"
                  />
                )}
                {isLoading ? (
                  <IconLoading
                    size="16"
                    className="ml-1"
                  />
                ) : (
                  <p
                    className="relative z-10 text-white text-sm"
                    style={{
                      textShadow: '1px 1px 0.5px black',
                    }}
                  >
                    {upgradeModal?.item?.price}
                  </p>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ClaimLevelUpModal;
