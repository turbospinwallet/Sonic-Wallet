import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { MdDelete, MdExitToApp } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi2';
import { RiSeedlingLine } from 'react-icons/ri';
import { TbChevronRight } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';
import { IoChevronBack } from 'react-icons/io5';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { formatAddress, useWallet } from '@/hooks/useWallet';
import { useCoins } from '@/hooks/useCoins';
import EditAccountNameModal from '@/modules/account/components/EditAccountNameModal';
import reactiveStorage from '@/internals/reactive-storage';
import { formatNumber } from '@/common/utils/number';
import useNotification from '@/hooks/useNotification';

const Account = () => {
  const { showBackButton } = useDisplayBackButtonMiniApp();
  const { clearWallet, address, accountName, updateAccountName, switchWallet, removeAccount } =
    useWallet();
  const { data, refetch } = useCoins(address);
  const [showEditModal, setShowEditModal] = useState(false);
  const [localForceUpdate, setLocalForceUpdate] = useState(0);
  const toast = useNotification();

  const router = useRouter();

  const accounts = useMemo(() => {
    const credentials = reactiveStorage.get('USER_CREDENTIAL') || {};
    return Object.entries(credentials).map(([address, details]: [string, any]) => ({
      address,
      name: details.name,
    }));
  }, [localForceUpdate]);

  const tokenInfo = useMemo(() => {
    const tokenNative = data?.find((item) => item.type === 'native');
    return `${formatNumber(tokenNative?.balance, 4)} ${tokenNative?.symbol}`;
  }, [data]);

  const onLogout = () => {
    clearWallet();
    void router.replace('/dapp');
  };

  const handleSwitchAccount = (newAddress: string) => {
    if (newAddress !== address) {
      switchWallet(newAddress);
      refetch();
    }
  };

  useEffect(() => {
    if (address) {
      void refetch();
    }
  }, [address, refetch]);

  useEffect(() => {
    showBackButton();
  }, []);

  const handleUpdateName = (name: string) => {
    updateAccountName(name);
    setLocalForceUpdate((prev) => prev + 1);
    setShowEditModal(false);
  };

  const handleRemoveAccount = (addressToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (accounts.length <= 1) {
        toast('Cannot remove the last account', 'error');
        return;
      }

      removeAccount(addressToRemove);
      setLocalForceUpdate((prev) => prev + 1);
      refetch();
      toast('Account removed successfully', 'success');
    } catch (error: any) {
      toast(error.message || 'Failed to remove account', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-10 bg-secondary">
      <div className="gap-8 flex flex-col w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.replace('/dapp/wallet')}
            className="p-2 hover:bg-neutral/10 rounded-full"
          >
            <IoChevronBack
              size={24}
              className="text-neutral"
            />
          </button>
          <p className="text-4xl font-bold text-neutral">Account</p>
        </div>

        <div className="flex flex-col gap-3">
          {accounts.map((account) => (
            <div
              key={account.address}
              className={`flex relative border resize-none rounded-md ${
                address === account.address ? 'border-primary' : 'border-neutral/20'
              } p-4 gap-4 cursor-pointer bg-secondary/50`}
              onClick={() => handleSwitchAccount(account.address)}
            >
              <div className="flex-1">
                <p className="text-xl font-bold text-neutral truncate max-w-[200px]">
                  {account.name}
                </p>
                <p className="text-xs text-neutral/70">{formatAddress(account.address)}</p>
                {address === account.address && <p className="text-sm text-primary">{tokenInfo}</p>}
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-2 flex gap-2">
                {address === account.address && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEditModal(true);
                    }}
                  >
                    <HiOutlinePencil
                      size={20}
                      className="text-neutral hover:text-primary"
                    />
                  </button>
                )}
                {accounts.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveAccount(account.address, e)}
                    className="text-neutral hover:text-red-500"
                  >
                    <MdDelete size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            className="flex w-full bg-neutral/5 hover:bg-neutral/10 p-4 items-center gap-2 rounded-lg text-neutral"
            onClick={() => void router.push('/dapp/import-account')}
          >
            <IoMdAdd size={25} />
            <span className="flex-1 text-left font-normal text-sm">Import Account</span>
            <TbChevronRight size={25} />
          </button>
        </div>

        <div className="">
          <p className="mt-4 font-semibold mb-2 text-xl text-neutral">Settings</p>
          <div className="flex flex-col gap-3">
            <button
              className="flex w-full bg-neutral/5 hover:bg-neutral/10 p-4 items-center gap-2 rounded-lg text-neutral"
              onClick={() => void router.replace('/dapp/credential')}
            >
              <RiSeedlingLine size={25} />
              <span className="flex-1 text-left font-normal text-sm">Seed Phrase</span>
              <TbChevronRight size={25} />
            </button>
          </div>
        </div>
      </div>

      <div className="gap-3 flex flex-col w-full mt-4">
        <ButtonCustom
          color="primary"
          className="w-full font-bold"
          onClick={onLogout}
        >
          <MdExitToApp size={28} />
          Log out
        </ButtonCustom>
      </div>

      <EditAccountNameModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleUpdateName}
        initialName={accountName}
      />
    </div>
  );
};

export default Account;
