import React from 'react';
import { useRouter } from 'next/router';
import { useWallet } from '@/hooks/useWallet';
import PasswordModal from '@/modules/shared/components/PasswordModal';
import useNotification from '@/hooks/useNotification';
import reactiveStorage from '@/internals/reactive-storage';
import { usePasswordStore } from '@/stores/passwordStore';

interface Props {
  children: React.ReactNode;
}

const PasswordVerification: React.FC<Props> = ({ children }) => {
  const { verifyPassword } = useWallet();
  const { password, setPassword } = usePasswordStore();
  const toast = useNotification();
  const router = useRouter();

  const handlePasswordSubmit = (inputPassword: string) => {
    const credentials = reactiveStorage.get('USER_CREDENTIAL');
    const activeWallet = reactiveStorage.get('ACTIVE_WALLET');

    if (credentials && activeWallet?.address) {
      const wallet = credentials[activeWallet.address];
      if (verifyPassword(inputPassword, wallet)) {
        setPassword(inputPassword);
        void router.push('/dapp/wallet');
      } else {
        toast('Invalid password', 'error');
      }
    }
  };

  if (!password) {
    return (
      <PasswordModal
        isOpen={true}
        onSubmit={handlePasswordSubmit}
        mode="verify"
        title="Enter Password"
      />
    );
  }

  return <>{children}</>;
};

export default PasswordVerification;
