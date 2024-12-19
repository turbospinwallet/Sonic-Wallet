import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import { useCopyText } from '@/hooks/useCopy';
import BasicModal from '@/components/ModalCustom/BasicModal';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

const QRCodeModal = ({ isOpen, onClose, address }: QRCodeModalProps) => {
  const { copyText } = useCopyText();

  return (
    <BasicModal
      open={isOpen}
      onClose={onClose}
      size="sm"
    >
      <div className="px-4 pb-6">
        <h3 className="text-xl font-bold text-center mb-4 text-neutral">Deposit</h3>
        <div className="bg-white p-4 rounded-lg flex justify-center mb-4">
          <QRCodeSVG
            value={address}
            size={200}
            level="H"
          />
        </div>
        <div className="bg-neutral/5 p-3 rounded-lg flex items-center gap-2 mb-4">
          <p className="text-sm flex-1 break-all text-neutral">{address}</p>
          <DocumentDuplicateIcon
            className="w-[20px] shrink-0 cursor-pointer text-neutral hover:text-primary"
            onClick={() => copyText(address)}
          />
        </div>
        <p className="text-sm text-center mb-4 text-neutral/70">
          Send only supported tokens to this address
        </p>
        <button
          className="w-full bg-primary hover:bg-primary/80 rounded-lg py-2 font-bold text-neutral"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </BasicModal>
  );
};

export default QRCodeModal;
