import React from 'react';
import BasicModal from '@/components/ModalCustom/BasicModal';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';

interface TransferConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  receiverAddress: string;
  amount: string;
  symbol?: string;
  isLoading?: boolean;
}

const TransferConfirmModal: React.FC<TransferConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  receiverAddress,
  amount,
  symbol,
  isLoading,
}) => {
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      size="sm"
    >
      <div className="px-2">
        <h2 className="text-xl font-semibold text-neutral mb-4">Confirm Transfer</h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral/70">To</p>
            <p className="text-neutral break-all">{receiverAddress}</p>
          </div>

          <div>
            <p className="text-sm text-neutral/70">Amount</p>
            <p className="text-neutral">
              {amount} {symbol}
            </p>
          </div>

          <div className="pt-4 space-y-2">
            <ButtonCustom
              color="primary"
              className="w-full font-bold"
              onClick={onConfirm}
              disabled={isLoading}
              loading={isLoading}
            >
              Confirm
            </ButtonCustom>

            <ButtonCustom
              color="secondary"
              className="w-full font-bold"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </ButtonCustom>
          </div>
        </div>
      </div>
    </BasicModal>
  );
};

export default TransferConfirmModal;
