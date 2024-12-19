import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiCopy, FiEye, FiEyeOff } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { createNewWalletBySeedPhrase } from '@/common/utils/wallet';
import type { ICWalletInfoStorage } from '@/common/interfaces';
import reactiveStorage from '@/internals/reactive-storage';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { useCopyText } from '@/hooks/useCopy';
import { useWallet } from '@/hooks/useWallet';
import useNotification from '@/hooks/useNotification';
import { useAppState } from '@/modules/shared/state/app-state';
import PasswordModal from '@/modules/shared/components/PasswordModal';

const CreateAccount = () => {
  const toast = useNotification();
  const { showBackButton } = useDisplayBackButtonMiniApp();
  const router = useRouter();
  const [wallet, setWallet] = React.useState<ICWalletInfoStorage | null>(null);
  const [showSeed, setShowSeed] = React.useState<number[]>([]);
  const { copyText } = useCopyText();
  const [isLoading, setIsLoading] = React.useState(false);
  const { formatWalletSaved } = useWallet();
  const { setNavigated } = useAppState();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const generateWallet = () => {
    const data = createNewWalletBySeedPhrase();
    setWallet(data);
  };

  const onPressContinue = () => {
    if (wallet) {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    try {
      setIsLoading(true);

      const savedWallet = formatWalletSaved(wallet!, password);

      reactiveStorage.set('USER_CREDENTIAL', {
        [wallet!.address]: savedWallet,
      });

      reactiveStorage.set('ACTIVE_WALLET', {
        address: wallet!.address,
      });

      setIsLoading(false);
      void router.replace('/dapp/wallet');
    } catch (error: any) {
      setIsLoading(false);
      toast(error.message || 'Failed to create wallet');
    }
    setShowPasswordModal(false);
  };

  useEffect(() => {
    showBackButton();
    generateWallet();
    setNavigated(true);
  }, []);

  const renderOptionButton = (num: number) => {
    return (
      <div className="flex justify-center gap-4 text-xs mt-2">
        <button
          type="button"
          className="flex gap-2 border border-primary px-3 py-1 rounded items-center text-neutral hover:bg-primary/10"
          onClick={() => {
            setShowSeed((prev) => {
              return prev.includes(num) ? prev.filter((i) => i !== num) : [...prev, num];
            });
          }}
        >
          {showSeed.includes(num) ? <FiEye size={18} /> : <FiEyeOff size={18} />}
          View
        </button>
        <button
          type="button"
          className="flex gap-2 border border-primary py-1 px-3 rounded text-neutral hover:bg-primary/10"
          onClick={() => copyText(wallet?.mnemonic || '')}
        >
          <FiCopy size={16} />
          Copy
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-10 bg-secondary">
      <div className="gap-3 flex flex-col w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dapp')}
            className="p-2 hover:bg-neutral/10 rounded-full"
          >
            <IoChevronBack
              size={24}
              className="text-neutral"
            />
          </button>
          <h1 className="text-3xl font-semibold text-neutral">Create account</h1>
        </div>
        <div>
          <p className="mt-4 font-semibold mb-2 text-xl text-neutral">Address</p>
          <p className="text-sm text-neutral/70">We have created a unique wallet address for you</p>
        </div>
        <div className="flex flex-col relative">
          <textarea
            value={wallet?.address || ''}
            className="bg-secondary/50 border resize-none rounded-md border-neutral/20 p-3 text-neutral"
            rows={4}
            placeholder=""
            readOnly
          />
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-2 text-neutral hover:text-primary"
            onClick={() => copyText(wallet?.address || '')}
          >
            <FiCopy size={24} />
          </button>
        </div>
      </div>
      <div className="gap-3 flex flex-col w-full">
        <div>
          <p className="mt-4 font-semibold mb-2 text-xl text-neutral">Seed Phrase</p>
          <p className="text-sm text-neutral/70">
            Copy your seed phrase right now to avoid losing your account!
          </p>
        </div>
        <div className="rounded-md border-neutral/20 border">
          <textarea
            value={wallet?.mnemonic || ''}
            disabled
            className="bg-secondary/50 resize-none w-full h-full rounded-md p-3 text-neutral"
            style={{ filter: showSeed.includes(1) ? 'blur(0)' : 'blur(4px)' }}
            rows={3}
            placeholder="Seed phrase"
          />
        </div>
        {renderOptionButton(1)}
      </div>
      <div className="w-full py-4">
        <ButtonCustom
          color="primary"
          className="w-full font-bold"
          onClick={onPressContinue}
          disabled={isLoading}
          loading={isLoading}
        >
          Continue
        </ButtonCustom>
      </div>
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordSubmit}
        mode="create"
        title="Create Password"
      />
    </div>
  );
};

export default CreateAccount;
