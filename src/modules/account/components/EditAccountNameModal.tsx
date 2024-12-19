import React, { useState } from 'react';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';

interface EditAccountNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialName?: string;
}

const EditAccountNameModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialName = 'Account 1',
}: EditAccountNameModalProps) => {
  const [name, setName] = useState(initialName);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-secondary/80 flex items-center justify-center px-6 z-50">
      <div className="bg-secondary border border-neutral/20 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-neutral">Change account name</h2>

        <div className="mb-6">
          <p className="mb-2 text-neutral">Account name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-secondary/50 border rounded-md border-neutral/20 p-3 text-neutral"
            placeholder="Enter account name"
          />
        </div>

        <div className="flex gap-3">
          <ButtonCustom
            className="flex-1 !bg-transparent !text-neutral font-bold !rounded-lg !border-neutral/20 !border"
            onClick={onClose}
          >
            Cancel
          </ButtonCustom>
          <ButtonCustom
            className="flex-1 !bg-primary hover:!bg-primary/80 !text-neutral font-bold !rounded-lg !border-0"
            onClick={() => {
              onSubmit(name);
              onClose();
            }}
          >
            Update
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default EditAccountNameModal;
