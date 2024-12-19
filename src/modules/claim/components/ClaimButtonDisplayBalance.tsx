import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import IconLoading from '@/components/IconLoading/IconLoading';

export const ClaimButtonDisplayBalance = ({
  value,
  iconLeft,
  iconRight,
  onClickIconLeft,
  onClickIconRight,
  loading,
}: {
  value: string;
  iconLeft?: {
    src: string;
    alt: string;
    height?: number;
    width?: number;
  };
  onClickIconLeft?: () => void;
  iconRight?: {
    src: string;
    alt: string;
    height?: number;
    width?: number;
  };
  onClickIconRight?: () => void;
  loading?: boolean;
}) => {
  return (
    <div className="relative px-4 inline-block">
      {iconLeft ? (
        <Image
          src={iconLeft.src}
          alt={iconLeft.alt}
          height={iconLeft.height || 40}
          width={iconLeft.width || 40}
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: iconLeft.width ? `-${iconLeft.width * 0.35}px` : '-10px' }}
          onClick={onClickIconLeft}
        />
      ) : null}
      <button
        className={clsx(
          'bg-white/70 text-secondary-900 px-4 h-[35px] rounded-full max-w-[160px] truncate  min-w-[90px] text-lg font-bold',
          value?.length > 8 && 'text-sm'
        )}
        disabled={loading}
      >
        {loading ? <IconLoading color="primary" /> : value}
      </button>

      {iconRight ? (
        <Image
          src={iconRight.src}
          alt={iconRight.alt}
          height={iconRight.height || 40}
          width={iconRight.width || 40}
          className={`absolute top-1/2 -translate-y-1/2`}
          style={{ right: iconRight.width ? `-${iconRight.width * 0.2}px` : '-10px' }}
          onClick={onClickIconRight}
        />
      ) : null}
    </div>
  );
};
