import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { IoChevronBack } from 'react-icons/io5';
import useNotification from '@/hooks/useNotification';
import { useWallet } from '@/hooks/useWallet';
import reactiveStorage from '@/internals/reactive-storage';
import { usePasswordStore } from '@/stores/passwordStore';
import { importWalletBySeedPhrase } from '@/common/utils/wallet';
import { APP_NAME } from '@/common/constants/const';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';

const RestoreVault = () => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const toast = useNotification();
  const { formatWalletSaved } = useWallet();
  const { setPassword } = usePasswordStore();

  const handleRestore = async () => {
    try {
      setIsLoading(true);
      setError('');

      if (newPassword.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Validate and import wallet using seed phrase
      const wallet = importWalletBySeedPhrase(seedPhrase.trim());
      if (!wallet) {
        setError('Invalid seed phrase');
        return;
      }

      reactiveStorage.clear('USER_CREDENTIAL');
      reactiveStorage.clear('ACTIVE_WALLET');

      // Format and save wallet with new password
      const savedWallet = formatWalletSaved(wallet, newPassword);

      reactiveStorage.set('USER_CREDENTIAL', {
        [wallet.address]: savedWallet,
      });

      reactiveStorage.set('ACTIVE_WALLET', {
        address: wallet.address,
      });

      setPassword(newPassword);

      toast('Wallet restored successfully');
      await router.push('/dapp/wallet');
    } catch (error: any) {
      setError(error.message || 'Restore failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-neutral/10 rounded-full"
        >
          <IoChevronBack
            size={24}
            className="text-neutral"
          />
        </button>
        <h1 className="text-2xl font-semibold text-neutral">Reset Wallet</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-sm">
          <p className="text-yellow-500 text-sm leading-relaxed">
            {APP_NAME} does not keep a copy of your password. If you&apos;re having trouble
            unlocking your account, you will need to reset your wallet. You can do this by providing
            the Secret Recovery Phrase you used when you set up your wallet.
          </p>
          <p className="text-yellow-500 text-sm leading-relaxed mt-4">
            This action will delete your current wallet and Secret Recovery Phrase from this device,
            along with the list of accounts you&apos;ve curated.
          </p>
          <p className="text-yellow-500 font-semibold text-sm mt-4">
            Make sure you&apos;re using the correct Secret Recovery Phrase before proceeding. You
            will not be able to undo this.
          </p>
        </div>

        <div>
          <label className="block text-sm text-neutral mb-2">Seed Phrase</label>
          <textarea
            value={seedPhrase}
            onChange={(e) => setSeedPhrase(e.target.value)}
            className="w-full bg-gray-800 border-none rounded-lg p-4 text-neutral placeholder-gray-400 min-h-[100px]"
            placeholder="Enter your 12-word seed phrase"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-gray-800 border-none rounded-lg p-4 text-neutral placeholder-gray-400"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="block text-sm text-neutral mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 border-none rounded-lg p-4 text-neutral placeholder-gray-400"
            placeholder="Confirm new password"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <ButtonCustom
          onClick={handleRestore}
          disabled={isLoading || !seedPhrase || !newPassword || !confirmPassword}
          loading={isLoading}
          className="w-full mt-8"
        >
          {isLoading ? 'Restoring...' : 'Restore Wallet'}
        </ButtonCustom>
      </div>
    </div>
  );
};

export default RestoreVault;
