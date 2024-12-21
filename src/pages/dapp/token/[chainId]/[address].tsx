import React from 'react';
import { useRouter } from 'next/router';
import { IoChevronBack, IoEllipsisVertical } from 'react-icons/io5';
import { FiCopy, FiExternalLink, FiEyeOff, FiSend } from 'react-icons/fi';
import { QrCodeIcon } from '@heroicons/react/24/outline';
import { useWallet } from '@/hooks/useWallet';
import { useCoins } from '@/hooks/useCoins';
import { formatNumber } from '@/common/utils/number';
import { useCopyText } from '@/hooks/useCopy';
import { useNetworkStore } from '@/stores/networkStore';
import DropdownHover from '@/components/DropdownCustom/DropdownHover';
import { removeImportedToken } from '@/common/utils/wallet';
import { getExplorerUrl } from '@/common/constants/explorers';
import QRCodeModal from '@/modules/wallet/components/QRCodeModal';
import { TokenIcon } from '@/modules/shared/components/TokenIcon';

const TokenDetail = () => {
  const router = useRouter();
  const { chainId, address: tokenAddress } = router.query;
  const { address: walletAddress } = useWallet();
  const { data: tokens, refetch } = useCoins(walletAddress);
  const { copyText } = useCopyText();
  const { setCurrentChainId } = useNetworkStore();
  const [showQRModal, setShowQRModal] = React.useState(false);

  const isNativeToken = tokenAddress === 'native';

  // Set network when component mounts
  React.useEffect(() => {
    if (chainId) {
      setCurrentChainId(Number(chainId));
    }
  }, [chainId, setCurrentChainId]);

  const token = tokens?.find((t) => t.type === tokenAddress);

  const handleHideToken = () => {
    if (token && chainId) {
      removeImportedToken(token.type, Number(chainId));
      refetch();
      router.back();
    }
  };

  const handleViewInExplorer = () => {
    const explorerUrl = getExplorerUrl(
      Number(chainId),
      'address',
      token?.type === 'native' ? walletAddress || '' : token?.type || ''
    );
    if (!explorerUrl) return;
    window.open(explorerUrl, '_blank');
  };

  const handleSend = () => {
    void router.push({
      pathname: '/dapp/transfer',
      query: {
        token: token?.symbol,
      },
    });
  };

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-neutral/10">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-neutral/10 rounded-full"
        >
          <IoChevronBack
            size={24}
            className="text-neutral"
          />
        </button>
        <div className="flex-1 flex items-center gap-2">
          <div className="relative w-8 h-8">
            <TokenIcon
              symbol={token.symbol}
              chainId={Number(chainId)}
              size={32}
            />
          </div>
          <span className="text-xl font-bold text-neutral">{token.symbol}</span>
        </div>
        <DropdownHover
          hasArrow={false}
          menu={
            <button className="p-2 hover:bg-neutral/10 rounded-full">
              <IoEllipsisVertical
                size={24}
                className="text-neutral"
              />
            </button>
          }
          className="relative"
          classNameMenu="hover:opacity-80"
          classNameMenuItem="bg-secondary border border-neutral/20 rounded-lg overflow-hidden min-w-[200px] absolute right-0"
        >
          <div className="py-2">
            <button
              onClick={handleViewInExplorer}
              className="w-full px-4 py-2.5 text-sm text-left hover:bg-neutral/5 flex items-center gap-2 text-neutral"
            >
              <FiExternalLink size={20} />
              View Asset in explorer
            </button>
            {!isNativeToken && (
              <button
                onClick={handleHideToken}
                className="w-full px-4 py-2.5 text-sm text-left hover:bg-neutral/5 flex items-center gap-2 text-red-500"
              >
                <FiEyeOff size={20} />
                Hide {token.symbol}
              </button>
            )}
          </div>
        </DropdownHover>
      </div>

      {/* Balance */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-neutral mb-2">Your balance</h2>
        <div className="flex items-center gap-3 p-4 bg-neutral/5 rounded-lg">
          <div className="relative w-10 h-10">
            <TokenIcon
              symbol={token.symbol}
              chainId={Number(chainId)}
              size={40}
            />
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-neutral">{token.symbol}</p>
            <p className="text-neutral/70">{formatNumber(token.balance, 4)}</p>
          </div>
        </div>

        {/* Add Actions */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSend}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-primary hover:bg-primary/80 text-neutral font-bold rounded-lg"
          >
            <FiSend size={20} />
            Send
          </button>
          <button
            onClick={() => setShowQRModal(true)}
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-neutral/10 hover:bg-neutral/20 text-neutral font-bold rounded-lg"
          >
            <QrCodeIcon className="w-5 h-5" />
            Receive
          </button>
        </div>
      </div>

      {/* Token Details */}
      {!isNativeToken && (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-neutral mb-4">Token details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-neutral/70 mb-1">Contract address</p>
              <div className="flex items-center gap-2 p-3 bg-neutral/5 rounded-lg">
                <span className="flex-1 text-neutral font-medium truncate">{token.type}</span>
                <button
                  onClick={() => copyText(token.type)}
                  className="p-2 hover:bg-neutral/10 rounded-full"
                >
                  <FiCopy
                    size={20}
                    className="text-neutral"
                  />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-neutral/70 mb-1">Token decimal</p>
              <div className="p-3 bg-neutral/5 rounded-lg">
                <span className="text-neutral font-medium">{token.decimals}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add QR Code Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        address={walletAddress || ''}
      />
    </div>
  );
};

export default TokenDetail;
