import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useConnect } from 'wagmi';
import { IoChevronBack } from 'react-icons/io5';
import reactiveStorage from '@/internals/reactive-storage';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { importWalletByPrivateKey, importWalletBySeedPhrase } from '@/common/utils/wallet';
import type { ICWalletInfoStorage } from '@/common/interfaces';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { useCreateUser } from '@/hooks/queries/user';
import { useTelegram } from '@/hooks/useTelegram';
import { useWallet } from '@/hooks/useWallet';
import useNotification from '@/hooks/useNotification';
import { useAppState } from '@/modules/shared/state/app-state';

const Login = () => {
  const { showBackButton } = useDisplayBackButtonMiniApp();
  const toast = useNotification();
  const { connect } = useConnect();

  const router = useRouter();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState<ICWalletInfoStorage | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { mutateAsync: createUser } = useCreateUser();
  const { userInfo, params } = useTelegram();
  const { formatWalletSaved } = useWallet();
  const { setNavigated } = useAppState();

  const handleChangeInput = (text: string) => {
    setInput(text);
    let _wallet;
    try {
      _wallet = importWalletByPrivateKey(text);
    } catch (error) {
      try {
        if (text.split(' ').length === 12) {
          _wallet = importWalletBySeedPhrase(text);
        }
      } catch (innerError) {
        // Both import attempts failed
      }
    }
    if (!_wallet) {
      return setError('Invalid seed phrase or private key');
    }
    setWallet(_wallet);
    setError('');
  };

  const handleLogin = () => {
    try {
      if (wallet) {
        setIsLoading(true);

        // Connect wallet using wagmi
        // connect({
        //   address: wallet.address,
        //   chainId: sonicBlazeChain.id,
        // });

        // const body = {
        // 	address: wallet.address,
        // 	authenticate: userInfo,
        // 	code: params?.code,
        // };

        // await createUser(body);

        const savedWallet = formatWalletSaved(wallet);

        // Save wallet info
        reactiveStorage.set('USER_CREDENTIAL', {
          [wallet.address]: savedWallet,
        });
        reactiveStorage.set('ACTIVE_WALLET', {
          address: wallet.address,
        });

        toast('Login successful');
        void router.push('/dapp/wallet');
      }
    } catch (error: any) {
      toast(error.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    showBackButton();
    setNavigated(true);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-between px-6 py-10 bg-secondary">
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
          <div>
            <h1 className="text-3xl font-semibold text-neutral">Login</h1>
          </div>
        </div>
        <div className="">
          <p className="mt-4 text-neutral">Import</p>
          <p className="text-sm text-neutral/70">Enter your seed phrase or private key to login</p>
        </div>
        <div className="flex flex-col">
          <textarea
            value={input}
            onChange={(e) => handleChangeInput(e.target.value)}
            className="w-full bg-secondary/50 border rounded-md border-neutral/20 p-3 text-neutral resize-none"
            rows={6}
            placeholder="Seed phrase or private key"
          />
          <span className="text-rose-500 text-sm">{error}</span>
        </div>
      </div>
      <div className="gap-3 flex flex-col w-full px-3">
        <ButtonCustom
          color="primary"
          className="w-full font-bold"
          disabled={Boolean(!input || error) || isLoading}
          loading={isLoading}
          onClick={handleLogin}
        >
          Continue
        </ButtonCustom>
      </div>
    </div>
  );
};

export default Login;
