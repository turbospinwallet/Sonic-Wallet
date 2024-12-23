import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { createPublicClient, createWalletClient, http, parseEther, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import { useDisplayBackButtonMiniApp } from '@/hooks/useDisplayBackButtonMiniApp';
import { formatAddress, useWallet } from '@/hooks/useWallet';
import { useCoins } from '@/hooks/useCoins';
import useNotification from '@/hooks/useNotification';

import { erc20ABI } from '@/common/abi/erc20';
import TransferConfirmModal from '@/modules/transfer/components/TransferConfirmModal';
import reactiveStorage from '@/internals/reactive-storage';
import { getChainConfig, useNetworkStore } from '@/stores/networkStore';

const Transfer = () => {
  const router = useRouter();
  const { showBackButton } = useDisplayBackButtonMiniApp();
  const { address, wallet } = useWallet();
  const { data: tokens } = useCoins(address);
  const toast = useNotification();
  const { currentChainId } = useNetworkStore();
  const { token: preSelectedToken } = router.query;

  const [receiverAddress, setReceiverAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState((preSelectedToken as string) || '');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const selectedTokenInfo = tokens?.find((token) => token.symbol === selectedToken);

  const balance = selectedTokenInfo ? Number(selectedTokenInfo.balance) : 0;

  const importedAccounts = useMemo(() => {
    const credentials = reactiveStorage.get('USER_CREDENTIAL') || {};
    return Object.entries(credentials)
      .filter(([addr]) => addr !== address)
      .map(([addr, details]: [string, any]) => ({
        address: addr,
        name: details.name,
      }));
  }, [address]);

  const handleConfirmTransfer = () => {
    setShowConfirmModal(true);
  };

  const handleTransfer = async () => {
    try {
      setShowConfirmModal(false);
      setIsLoading(true);

      if (!selectedTokenInfo || !wallet?.privateKey || !address) {
        throw new Error('Invalid token or wallet not found');
      }

      // Remove '0x' prefix if present and ensure proper format
      const privateKey = wallet.privateKey.startsWith('0x')
        ? wallet.privateKey
        : `0x${wallet.privateKey}`;

      const account = privateKeyToAccount(privateKey as `0x${string}`);

      // Get chain config based on selected network
      const chainConfig = getChainConfig(currentChainId);

      const walletClient = createWalletClient({
        account,
        chain: chainConfig,
        transport: http(),
      });

      let hash: `0x${string}`;

      // Ensure receiver address has 0x prefix
      const formattedReceiverAddress = receiverAddress.startsWith('0x')
        ? receiverAddress
        : `0x${receiverAddress}`;

      if (selectedTokenInfo.type === 'native') {
        // Native token transfer
        hash = await walletClient.sendTransaction({
          to: formattedReceiverAddress as `0x${string}`,
          value: parseEther(amount),
        });
      } else {
        // ERC20 token transfer
        const value = parseUnits(amount, selectedTokenInfo.decimals);

        // Get token contract address from selectedTokenInfo
        const tokenAddress = selectedTokenInfo.type;
        if (!tokenAddress || typeof tokenAddress !== 'string' || !tokenAddress.startsWith('0x')) {
          throw new Error('Invalid token contract address');
        }

        hash = await walletClient.writeContract({
          address: tokenAddress as `0x${string}`,
          abi: erc20ABI,
          functionName: 'transfer',
          args: [formattedReceiverAddress as `0x${string}`, value],
        });
      }

      // Update public client to use selected network
      const publicClient = createPublicClient({
        chain: chainConfig,
        transport: http(),
      });

      await publicClient.waitForTransactionReceipt({ hash });

      toast('Transfer successful');
      void router.push('/dapp/wallet');
    } catch (error) {
      console.error('Transfer error:', error);
      toast((error as Error)?.message || 'Transfer failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetAmount = (percentage: number) => {
    if (selectedTokenInfo) {
      const amount = (balance * percentage).toFixed(selectedTokenInfo.decimals);
      setAmount(amount);
    }
  };

  useEffect(() => {
    showBackButton();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-10 bg-secondary">
      <div className="gap-6 flex flex-col w-full">
        <div>
          <h1 className="text-3xl font-semibold text-neutral">Transfer</h1>
          <p className="text-sm text-neutral/70">Send token in an instant</p>
        </div>

        <div>
          <p className="mb-2 text-neutral">Receiver</p>
          <div className="relative">
            <input
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              className="w-full bg-secondary/50 border rounded-md border-neutral/20 p-3 pr-12 text-neutral"
              placeholder="Enter Address"
              onFocus={() => setShowAccountDropdown(true)}
            />
            {showAccountDropdown && importedAccounts.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-secondary border border-neutral/20 rounded-md shadow-lg">
                {importedAccounts.map((account) => (
                  <button
                    key={account.address}
                    className="w-full px-4 py-2 text-left hover:bg-neutral/10 flex flex-col"
                    onClick={() => {
                      setReceiverAddress(account.address);
                      setShowAccountDropdown(false);
                    }}
                  >
                    <span className="font-medium text-neutral">{account.name}</span>
                    <span className="text-sm text-neutral/70">
                      {formatAddress(account.address)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="mb-2 text-neutral">Asset</p>
          <select
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="w-full bg-secondary/50 border rounded-md border-neutral/20 p-3 text-neutral"
          >
            <option value="">Choose Token</option>
            {tokens?.map((token) => (
              <option
                key={token.symbol}
                value={token.symbol}
              >
                {token.symbol}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <p className="text-neutral">Amount</p>
            <p className="text-sm text-neutral/70">Balance: {balance}</p>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-secondary/50 border rounded-md border-neutral/20 p-3 text-neutral"
            placeholder="0"
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[0.25, 0.5, 0.75, 1].map((value) => (
              <button
                key={value}
                onClick={() => handleSetAmount(value)}
                className="bg-neutral/5 hover:bg-neutral/10 rounded p-2 text-sm text-neutral"
              >
                {value === 1 ? 'MAX' : `${value * 100}%`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full gap-3 flex flex-col">
        <ButtonCustom
          color="primary"
          className="w-full font-bold"
          onClick={handleConfirmTransfer}
          disabled={!receiverAddress || !selectedToken || !amount || isLoading}
          loading={isLoading}
        >
          Transfer
        </ButtonCustom>
        <ButtonCustom
          color="secondary"
          className="w-full font-bold"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </ButtonCustom>
      </div>

      <TransferConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleTransfer}
        receiverAddress={receiverAddress}
        amount={amount}
        symbol={selectedTokenInfo?.symbol}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Transfer;
