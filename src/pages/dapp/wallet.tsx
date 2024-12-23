import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Bars3Icon, DocumentDuplicateIcon, QrCodeIcon } from '@heroicons/react/24/solid';
import { FiChevronDown, FiDownload, FiPlus, FiSend } from 'react-icons/fi';
import { useSwitchNetwork } from 'wagmi';
import clsx from 'clsx';
import { useAppState } from '@/modules/shared/state/app-state';
import { useWallet } from '@/hooks/useWallet';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { useCoins } from '@/hooks/useCoins';
import { formatNumber } from '@/common/utils/number';
import { useCopyText } from '@/hooks/useCopy';
import { useTelegram } from '@/hooks/useTelegram';
import QRCodeModal from '@/modules/wallet/components/QRCodeModal';
import { useNetworkStore } from '@/stores/networkStore';
import DropdownHover from '@/components/DropdownCustom/DropdownHover';
import ImportTokensModal from '@/modules/wallet/components/ImportTokensModal';
import { TokenIcon } from '@/modules/shared/components/TokenIcon';
import { AVAILABLE_NETWORKS } from '@/common/connectors';
import { getNetworkIcon } from '@/common/utils/wallet';

const Wallet = () => {
  const router = useRouter();
  const { copyText } = useCopyText();
  const { address, accountName } = useWallet();
  const { userInfo, params } = useTelegram();
  const { claimInfo } = useAppState();
  const { data: coins, refetch } = useCoins(address);
  const [showQRModal, setShowQRModal] = React.useState(false);
  const { switchNetwork } = useSwitchNetwork();
  const { currentChainId, setCurrentChainId } = useNetworkStore();
  const [showImportModal, setShowImportModal] = useState(false);

  const networks = AVAILABLE_NETWORKS;

  const { hideBackButton } = useDisplayBackButtonMiniApp();

  const handleNetworkChange = (chainId: number) => {
    setCurrentChainId(chainId);
    switchNetwork?.(chainId);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between py-3">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            className="text-white hover:bg-neutral/10 p-2 rounded-full"
            onClick={() => router.push('/dapp/account')}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-white text-lg font-medium max-w-[150px] truncate">
              {accountName}
            </span>
            <DocumentDuplicateIcon
              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300"
              onClick={() => (address ? copyText(address) : null)}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <DropdownHover
            hasArrow={false}
            menu={
              <div className="flex items-center text-sm text-neutral bg-neutral/5 px-3 py-1.5 rounded-lg">
                <Image
                  src={getNetworkIcon(currentChainId)}
                  alt="network"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <FiChevronDown
                  size={16}
                  className="text-neutral"
                />
              </div>
            }
            className="relative"
            classNameMenu="hover:opacity-80"
            classNameMenuItem="bg-secondary border border-neutral/20 rounded-lg overflow-hidden min-w-[160px] absolute right-0"
          >
            <div className="py-2">
              {networks.map((network) => (
                <button
                  key={network.id}
                  className={clsx(
                    'w-full px-4 py-2.5 text-sm text-left hover:bg-neutral/5 flex items-center',
                    currentChainId === network.id ? 'text-primary' : 'text-neutral'
                  )}
                  onClick={() => handleNetworkChange(network.id)}
                >
                  <Image
                    src={getNetworkIcon(network.id)}
                    alt={network.name}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <div>
                    <div className="font-medium">{network.label}</div>
                    <div className="text-xs text-neutral/70">{network.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </DropdownHover>
        </div>
      </div>
    );
  };
  const renderBalance = () => {
    return (
      <div className="flex flex-col">
        <p className="text-sm text-neutral/70">Total Balance </p>
        <p className="text-3xl font-bold mb-6 text-neutral">$ {formatNumber(coins[0]?.usd || 0)}</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowQRModal(true)}
            className="flex flex-col items-center justify-center p-4 bg-neutral/5 rounded-lg hover:bg-neutral/10"
          >
            <FiDownload
              size={24}
              className="text-primary mb-2"
            />
            <span className="text-neutral text-sm">Deposit</span>
          </button>
          <button
            onClick={() => router.push('/dapp/transfer')}
            className="flex flex-col items-center justify-center p-4 bg-neutral/5 rounded-lg hover:bg-neutral/10"
          >
            <FiSend
              size={24}
              className="text-primary mb-2"
            />
            <span className="text-neutral text-sm">Transfer</span>
          </button>
        </div>
      </div>
    );
  };

  const renderGameSection = () => {
    return (
      <div>
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="game-logo"
              width={48}
              height={48}
            />
            <div className="flex-1">
              <h3 className="font-bold text-neutral">Spin Game</h3>
              <p className="text-xs text-neutral/70">Experience the thrill of our upcoming game</p>
            </div>
            <div className="bg-primary/20 px-3 py-1 rounded-full">
              <span className="text-primary text-sm font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    hideBackButton();
  }, []);

  useEffect(() => {
    if (!address) {
      void router.replace('/');
    }
  }, [address, router]);

  return (
    <div className="bg-secondary px-6 flex-1 pb-6 ">
      {renderHeader()}
      {renderBalance()}
      {renderGameSection()}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-neutral font-bold">Assets</p>
          <button
            className="flex items-center gap-1 text-primary"
            onClick={() => setShowQRModal(true)}
          >
            <QrCodeIcon className="w-[24px]" />
            <span className="text-sm">Receive</span>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {coins.map((coin) => (
            <div
              key={coin.type}
              onClick={() =>
                router.push({
                  pathname: `/dapp/token/${currentChainId}/${coin.type}`,
                })
              }
              className="flex items-center gap-3 p-4 bg-neutral/5 rounded-lg cursor-pointer hover:bg-neutral/10"
            >
              <div className="relative w-8 h-8">
                <TokenIcon
                  symbol={coin.symbol}
                  chainId={currentChainId}
                  size={32}
                />
              </div>
              <div className="flex-1">
                <p className="text-neutral font-bold">{coin.symbol}</p>
                <p className="text-sm text-neutral/70">{formatNumber(coin.balance, 4)}</p>
              </div>
              <div className="text-right">
                <p className="text-neutral">${formatNumber(coin.usd || 0)}</p>
                {coin.pricePercentChange24h && (
                  <p
                    className={clsx(
                      'text-xs',
                      Number(coin.pricePercentChange24h) >= 0 ? 'text-green-500' : 'text-red-500'
                    )}
                  >
                    {Number(coin.pricePercentChange24h) >= 0 ? '+' : ''}
                    {formatNumber(coin.pricePercentChange24h, 2)}%
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        address={address || ''}
      />

      <button
        onClick={() => setShowImportModal(true)}
        className="flex mt-2 items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg"
      >
        <FiPlus size={20} />
        Import Tokens
      </button>

      <ImportTokensModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportSuccess={() => {
          refetch();
        }}
      />
    </div>
  );
};

export default Wallet;
