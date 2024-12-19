import { useCallback, useEffect, useMemo, useState } from 'react';
import reactiveStorage from '@/internals/reactive-storage';
import type { ICWalletInfoStorage } from '@/common/interfaces';
import type { SavedUserCredential } from '@/internals/reactive-storage/declare-your-storage-here';

export function formatAddress(address: string | undefined, before = 6, after = 6) {
  if (!address) {
    return '';
  }
  const start = address.slice(0, before);
  const end = address.slice(-after);
  return `${start}...${end}`;
}

export const useWallet = () => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(() => {
    const activeWallet = reactiveStorage.get('ACTIVE_WALLET');
    return activeWallet?.address;
  });

  const address = useMemo(() => {
    const activeWallet = reactiveStorage.get('ACTIVE_WALLET');
    return activeWallet?.address;
  }, [forceUpdate]);

  const wallet = useMemo(() => {
    const credentials = reactiveStorage.get('USER_CREDENTIAL');
    return credentials?.[currentAddress as string];
  }, [currentAddress]);

  const shortAddress = useMemo(() => {
    return formatAddress(currentAddress);
  }, [currentAddress]);

  const accountName = useMemo(() => {
    const credentials = reactiveStorage.get('USER_CREDENTIAL');
    return credentials?.[currentAddress as string]?.name || 'Account 1';
  }, [currentAddress, forceUpdate]);

  useEffect(() => {
    setCurrentAddress(address);
  }, [address]);

  const updateAccountName = useCallback(
    (name: string) => {
      if (!currentAddress) return;

      const credentials = reactiveStorage.get('USER_CREDENTIAL');
      if (credentials?.[currentAddress]) {
        reactiveStorage.set('USER_CREDENTIAL', {
          ...credentials,
          [currentAddress]: {
            ...credentials[currentAddress],
            name,
          },
        });
        setForceUpdate((prev) => prev + 1);
      }
    },
    [currentAddress]
  );

  const formatWalletSaved = useCallback((wallet: ICWalletInfoStorage): SavedUserCredential => {
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic,
      name: 'Account 1',
    };
  }, []);

  const clearWallet = useCallback(() => {
    reactiveStorage.clear();
  }, []);

  const switchWallet = useCallback((newAddress: string) => {
    reactiveStorage.set('ACTIVE_WALLET', { address: newAddress });
    setCurrentAddress(newAddress);
    setForceUpdate((prev) => prev + 1);
  }, []);

  return {
    address: currentAddress,
    wallet,
    shortAddress,
    accountName,
    updateAccountName,
    isConnected: !!currentAddress,
    formatWalletSaved,
    clearWallet,
    switchWallet,
  };
};
