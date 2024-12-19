import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useConnect } from 'wagmi';
import type { Connector } from 'wagmi';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { importWalletByPrivateKey, importWalletBySeedPhrase } from '@/common/utils/wallet';
import reactiveStorage from '@/internals/reactive-storage';
import useNotification from '@/hooks/useNotification';
import { sonicBlazeChain } from '@/common/connectors';
import { useWallet } from '@/hooks/useWallet';
import type { ICWalletInfoStorage } from '@/common/interfaces';

const ImportAccount = () => {
  const { showBackButton } = useDisplayBackButtonMiniApp();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState<ICWalletInfoStorage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useNotification();
  const { connect } = useConnect();
  const { formatWalletSaved } = useWallet();

  useEffect(() => {
    showBackButton();
  }, []);

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

  const handleImport = () => {
    try {
      if (wallet) {
        setIsLoading(true);

        const credentials = reactiveStorage.get('USER_CREDENTIAL') || {};

        // Check if wallet is already imported
        if (credentials[wallet.address]) {
          toast('This wallet has already been imported', 'error');
          return;
        }

        connect({
          connector: {
            id: 'injected',
            name: 'Imported Wallet',
          },
          chainId: sonicBlazeChain.id,
        } as { connector: Connector; chainId: number });

        const accountNumber = Object.keys(credentials).length + 1;

        const walletInfo = {
          ...formatWalletSaved(wallet),
          name: `Account ${accountNumber}`,
        };

        reactiveStorage.set('USER_CREDENTIAL', {
          ...credentials,
          [wallet.address]: walletInfo,
        });

        reactiveStorage.set('ACTIVE_WALLET', {
          address: wallet.address,
        });

        toast('Account imported successfully', 'success');
        void router.replace('/dapp/account');
      }
    } catch (error: any) {
      console.log(error);
      toast(error.message || 'Import failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    void router.push('/dapp/account');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-10 bg-secondary">
      <div className="gap-8 flex flex-col w-full">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-neutral">Import Account</h1>
          <p className="text-sm text-neutral/70">
            Enter your seed phrase or private key to import your account
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <textarea
            className="w-full bg-secondary/50 border border-neutral/20 rounded-lg p-4 min-h-[120px] text-sm text-neutral"
            placeholder="Seed phrase or Private key"
            value={input}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
          {error && <span className="text-rose-500 text-sm">{error}</span>}
        </div>
      </div>

      <div className="w-full flex gap-4">
        <ButtonCustom
          className="!bg-neutral/10 hover:!bg-neutral/20 !text-neutral font-bold !rounded-lg !border-0 !shadow-none w-full"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </ButtonCustom>
        <ButtonCustom
          className="!bg-primary hover:!bg-primary/80 !text-neutral font-bold !rounded-lg !border-0 !shadow-none w-full"
          onClick={handleImport}
          disabled={Boolean(!input || error) || isLoading}
          loading={isLoading}
        >
          Import
        </ButtonCustom>
      </div>
    </div>
  );
};

export default ImportAccount;
