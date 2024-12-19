import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Bars3Icon, DocumentDuplicateIcon, QrCodeIcon } from '@heroicons/react/24/solid';
import { FiChevronDown, FiDownload, FiSend } from 'react-icons/fi';
import BigNumber from 'bignumber.js';
import { useSwitchNetwork } from 'wagmi';
import clsx from 'clsx';
import { useAppState } from '@/modules/shared/state/app-state';
import { useWallet } from '@/hooks/useWallet';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { useCoins } from '@/hooks/useCoins';
import { formatNumber } from '@/common/utils/number';
import { MAIN_TOKEN, sonicBlazeChain, sonicMainnetChain } from '@/common/connectors';
import { useCopyText } from '@/hooks/useCopy';
import { useTelegram } from '@/hooks/useTelegram';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import QRCodeModal from '@/modules/wallet/components/QRCodeModal';
import { useNetworkStore } from '@/stores/networkStore';
import DropdownHover from '@/components/DropdownCustom/DropdownHover';

const Wallet = () => {
  const router = useRouter();
  const { copyText } = useCopyText();
  const { address, accountName } = useWallet();
  const { userInfo, params } = useTelegram();
  const { claimInfo, navigated, setNavigated } = useAppState();
  const { data: coins } = useCoins(address);
  const [showQRModal, setShowQRModal] = React.useState(false);
  const { switchNetwork } = useSwitchNetwork();
  const { currentChainId, setCurrentChainId } = useNetworkStore();

  const networks = [
    {
      ...sonicMainnetChain,
      label: 'Mainnet',
    },
    {
      ...sonicBlazeChain,
      label: 'Testnet',
    },
  ];

  function getTokenPrice(token: any) {
    if (token && token.usd) {
      const totalValueUSD = new BigNumber(token.usd);
      const balance = new BigNumber(token.balance).dividedBy(new BigNumber(10).pow(token.decimals));
      const pricePerToken = totalValueUSD.dividedBy(balance);
      return pricePerToken.toString();
    } else {
      return 0;
    }
  }
  const { hideBackButton } = useDisplayBackButtonMiniApp();
  const tokens = useMemo(() => {
    return coins?.map((item) => {
      const price = getTokenPrice(item);
      const token = {
        ...item,
        iconURL: item?.symbol === MAIN_TOKEN.symbol ? '/images/s.png' : '/images/logo.png',
        price,
        balance: formatNumber(item.balance, 4),
      };
      return token;
    });
  }, [coins]);

  const handleNetworkChange = (chainId: number) => {
    setCurrentChainId(chainId);
    switchNetwork?.(chainId);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-3">
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
                  src="/images/sonic-black.svg"
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
                    src="/images/sonic-black.svg"
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
  const renderTokensList = () => {
    return (
      <div className="">
        <p className="font-bold text-xl mb-4">Tokens</p>
        <div className="flex flex-col gap-3">
          {tokens.map((item, index) => {
            return (
              <div
                key={index}
                className="p-4 bg-white/20 flex gap-2 rounded-lg text-sm"
              >
                {item.iconURL ? (
                  <Image
                    src={item.iconURL}
                    alt={item.symbol}
                    width={32}
                    height={32}
                  />
                ) : null}
                <div className="flex-1">
                  <p className="">{item.symbol}</p>
                  <p className="">
                    {item.balance}
                    {Number(item.price) ? ` . $${formatNumber(item.price as number)}` : null}
                  </p>
                </div>
                {/* <div className="text-right">
									<p className="">$ {formatNumber(item.usd as any) || 0}</p>
									<p
										className={clsx(
											"font-bold",
											item.pricePercentChange24h?.includes("-")
												? "text-red-1"
												: "text-green-1",
										)}
									>
										{!Number(item.pricePercentChange24h)
											? null
											: `${formatNumber(item.pricePercentChange24h as any)}%`}
									</p>
								</div> */}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAction = () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <ButtonCustom
            color="primary"
            className="w-full font-bold"
            onClick={() => setShowQRModal(true)}
          >
            <FiDownload size={28} />
            Deposit
          </ButtonCustom>
          <ButtonCustom
            color="primary"
            className="w-full font-bold"
            onClick={() => void router.replace('/dapp/transfer')}
          >
            <FiSend size={28} />
            Transfer
          </ButtonCustom>
        </div>
      </div>
    );
  };

  useEffect(() => {
    hideBackButton();
  }, []);

  useEffect(() => {
    if (params?.type && !navigated) {
      setNavigated(true);
      setTimeout(() => {
        void router.push(`/claim?type=${params.type}`);
      }, 700);
    }
  }, [params?.type]);

  useEffect(() => {
    if (!address) {
      void router.replace('/');
    }
  }, [address, router]);

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      {renderHeader()}
      <div className="flex flex-col px-6">
        {renderBalance()}
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
                className="flex items-center gap-3 p-4 bg-neutral/5 rounded-lg"
              >
                {coin.iconURL && (
                  <Image
                    src={coin.iconURL}
                    alt={coin.symbol}
                    width={32}
                    height={32}
                  />
                )}
                <div className="flex-1">
                  <p className="text-neutral font-bold">{coin.symbol}</p>
                  <p className="text-sm text-neutral/70">{formatNumber(coin.balance, 4)}</p>
                </div>
                <p className="text-neutral">${formatNumber(coin.usd || 0)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        address={address || ''}
      />
    </div>
  );
};

export default Wallet;
