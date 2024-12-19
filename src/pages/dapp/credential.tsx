import React, { useEffect } from 'react';
import { FiCopy, FiEye, FiEyeOff, FiInfo } from 'react-icons/fi';
import { IoChevronBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import useNotification from '@/hooks/useNotification';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { useWallet } from '@/hooks/useWallet';
import { useCopyText } from '@/hooks/useCopy';

const Credential = () => {
  const toast = useNotification();
  const { showBackButton } = useDisplayBackButtonMiniApp();
  const [showSeed, setShowSeed] = React.useState<number[]>([]);
  const { wallet } = useWallet();
  const { copyText } = useCopyText();
  const router = useRouter();

  useEffect(() => {
    showBackButton();
  }, []);

  const renderOptionButton = (num: number, isPrivateKey: boolean) => {
    return (
      <div className="flex justify-center gap-4 text-xs mt-2">
        <button
          className="flex gap-2 border border-primary px-3 py-1 rounded items-center text-neutral hover:bg-primary/10"
          onClick={() => {
            setShowSeed(() => {
              return showSeed?.includes(num)
                ? showSeed?.filter((i) => i !== num)
                : [...showSeed, num];
            });
          }}
        >
          {showSeed?.includes(num) ? <FiEye size={18} /> : <FiEyeOff size={18} />}
          View
        </button>
        <button
          className="flex gap-2 border border-primary py-1 px-3 rounded text-neutral hover:bg-primary/10"
          onClick={() => copyText((isPrivateKey ? wallet?.privateKey : wallet?.mnemonic) || '')}
        >
          <FiCopy size={16} />
          Copy
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-10 bg-secondary">
      <div className="gap-6 flex flex-col w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dapp/account')}
            className="p-2 hover:bg-neutral/10 rounded-full"
          >
            <IoChevronBack
              size={24}
              className="text-neutral"
            />
          </button>
          <h1 className="text-3xl font-semibold text-neutral">Credentials</h1>
        </div>
        <div className="border border-primary/30 px-3 py-2 flex gap-3 rounded-lg items-center text-primary bg-primary/5">
          <FiInfo size={30} />
          <p className="text-xs">
            Do not share your passphrase or private key with anyone, even with us!
          </p>
        </div>

        <div className="flex flex-col relative">
          <p className="text-xl font-bold mb-4 text-neutral">Private key</p>
          <div className="rounded-md border-neutral/20 border">
            <textarea
              value={wallet?.privateKey || ''}
              disabled
              className="bg-secondary/50 resize-none w-full h-full rounded-md p-3 text-neutral"
              style={{ filter: showSeed?.includes(1) ? 'blur(0)' : 'blur(4px)' }}
              rows={3}
              placeholder="Private key"
            />
          </div>
          {renderOptionButton(1, true)}
        </div>

        <div className="flex flex-col relative">
          <p className="text-xl font-bold mb-4 text-neutral">Seedphrase</p>
          <div className="rounded-md border-neutral/20 border">
            <textarea
              value={wallet?.mnemonic || ''}
              disabled
              className="bg-secondary/50 resize-none w-full h-full rounded-md p-3 text-neutral"
              style={{ filter: showSeed?.includes(2) ? 'blur(0)' : 'blur(4px)' }}
              rows={3}
              placeholder="Seed phrase"
            />
          </div>
          {renderOptionButton(2, false)}
        </div>
      </div>
    </div>
  );
};

export default Credential;
