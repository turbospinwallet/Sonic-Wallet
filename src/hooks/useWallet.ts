import { useCallback, useEffect, useMemo, useState } from 'react';
import reactiveStorage from '@/internals/reactive-storage';
import type { ICWalletInfoStorage } from '@/common/interfaces';
import type { SavedUserCredential } from '@/internals/reactive-storage/declare-your-storage-here';
import { decrypt, encrypt } from '@/common/utils/crypto';
import { usePasswordStore } from '@/stores/passwordStore';

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
  const { password, setPassword: setPasswordStore } = usePasswordStore();

  const address = useMemo(() => {
    const activeWallet = reactiveStorage.get('ACTIVE_WALLET');
    return activeWallet?.address;
  }, [forceUpdate]);

  const formatWalletSaved = useCallback(
    (wallet: ICWalletInfoStorage, password: string): SavedUserCredential => {
      return {
        address: wallet.address,
        privateKey: wallet.privateKey ? encrypt(wallet.privateKey, password) : undefined,
        mnemonic: wallet.mnemonic ? encrypt(wallet.mnemonic, password) : undefined,
        name: 'Account 1',
      };
    },
    []
  );

  const decryptWalletData = useCallback(
    (wallet: SavedUserCredential | undefined, password: string) => {
      if (!wallet) return null;

      try {
        return {
          ...wallet,
          privateKey: wallet.privateKey ? decrypt(wallet.privateKey, password) : undefined,
          mnemonic: wallet.mnemonic ? decrypt(wallet.mnemonic, password) : undefined,
        };
      } catch (error) {
        return null; // Return null if decryption fails (wrong password)
      }
    },
    []
  );

  const verifyPassword = useCallback(
    (password: string, wallet: SavedUserCredential): boolean => {
      try {
        // Try to decrypt the wallet data with the provided password
        const decrypted = decryptWalletData(wallet, password);
        return !!decrypted;
      } catch {
        return false;
      }
    },
    [decryptWalletData]
  );

  const wallet = useMemo(() => {
    const credentials = reactiveStorage.get('USER_CREDENTIAL');
    const encryptedWallet = credentials?.[currentAddress as string];
    if (!password || !encryptedWallet) return null;

    try {
      const decrypted = decryptWalletData(encryptedWallet, password);
      return decrypted;
    } catch (error) {
      return null;
    }
  }, [currentAddress, decryptWalletData, password]);

  const shortAddress = useMemo(() => {
    return formatAddress(currentAddress);
  }, [currentAddress]);

  const accountName = useMemo(() => {
    const credentials = reactiveStorage.get('USER_CREDENTIAL');
    return credentials?.[currentAddress as string]?.name || 'Account 1';
  }, [currentAddress, forceUpdate]);

  useEffect(() => {
    if (!currentAddress) {
      const activeWallet = reactiveStorage.get('ACTIVE_WALLET');
      if (activeWallet?.address) {
        setCurrentAddress(activeWallet.address);
      }
    }
  }, [currentAddress]);

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
    verifyPassword,
    setPassword: setPasswordStore,
    password,
  };
};
