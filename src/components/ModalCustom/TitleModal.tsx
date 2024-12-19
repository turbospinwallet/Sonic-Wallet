import React from 'react';
import clsx from 'clsx';
import SvgCloseIcon from '@/components/SvgIcons/SvgCloseIcon';

interface TitleModalProps {
  title?: string;
  titleClassName?: string;
  withCloseButton?: boolean;
  onClose?: () => void;
}

const TitleModal = ({ title, titleClassName, withCloseButton, onClose }: TitleModalProps) => {
  return (
    <div className={clsx('flex', withCloseButton ? 'justify-between' : 'justify-center')}>
      {title && (
        <h2 className={clsx('font-bold text-xl sm:text-3xl uppercase', titleClassName)}>{title}</h2>
      )}
      {withCloseButton && (
        <button
          onClick={onClose}
          className={clsx(
            !title && 'absolute top-3 right-3',
            'flex items-center justify-center w-8 h-8 rounded-md border border-primary-2'
          )}
          aria-label="Close dialog"
        >
          <SvgCloseIcon />
        </button>
      )}
    </div>
  );
};

export default TitleModal;
