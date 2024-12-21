import React, { useCallback, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { erc20ABI } from 'wagmi';
import { importToken } from '@/common/utils/wallet';
import { getChainConfig, useNetworkStore } from '@/stores/networkStore';
import useNotification from '@/hooks/useNotification';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import BasicModal from '@/components/ModalCustom/BasicModal';
import type { TokenInfo } from '@/types/token';

interface ImportTokensModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: () => void;
}

export default function ImportTokensModal({
  isOpen,
  onClose,
  onImportSuccess,
}: ImportTokensModalProps) {
  const [customAddress, setCustomAddress] = useState('');
  const [customSymbol, setCustomSymbol] = useState('');
  const [customDecimals, setCustomDecimals] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const currentChainId = useNetworkStore((state) => state.currentChainId);
  const toast = useNotification();

  const searchTokenOnChain = useCallback(
    async (address: string): Promise<TokenInfo | null> => {
      if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
        return null;
      }

      try {
        setIsSearching(true);
        const chainConfig = getChainConfig(currentChainId);
        const publicClient = createPublicClient({
          chain: chainConfig,
          transport: http(chainConfig.rpcUrls.default.http[0]),
        });

        // Try to get token info with fallbacks
        let name: string | undefined;
        let symbol: string | undefined;
        let decimals: number | undefined;

        try {
          name = (await publicClient.readContract({
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: 'name',
          })) as string;
        } catch (error) {
          console.error('Error fetching name, trying bytes32...', error);
          try {
            // Try bytes32 name
            const bytes32Name = await publicClient.readContract({
              address: address as `0x${string}`,
              abi: [
                {
                  constant: true,
                  inputs: [],
                  name: 'name',
                  outputs: [{ name: '', type: 'bytes32' }],
                  payable: false,
                  stateMutability: 'view',
                  type: 'function',
                },
              ],
              functionName: 'name',
            });
            name = hexToString(bytes32Name as `0x${string}`);
          } catch (error) {
            console.error('Failed to get name', error);
          }
        }

        try {
          symbol = (await publicClient.readContract({
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: 'symbol',
          })) as string;
        } catch (error) {
          console.error('Error fetching symbol, trying bytes32...', error);
          try {
            // Try bytes32 symbol
            const bytes32Symbol = await publicClient.readContract({
              address: address as `0x${string}`,
              abi: [
                {
                  constant: true,
                  inputs: [],
                  name: 'symbol',
                  outputs: [{ name: '', type: 'bytes32' }],
                  payable: false,
                  stateMutability: 'view',
                  type: 'function',
                },
              ],
              functionName: 'symbol',
            });
            symbol = hexToString(bytes32Symbol as `0x${string}`);
          } catch (error) {
            console.error('Failed to get symbol', error);
          }
        }

        try {
          decimals = (await publicClient.readContract({
            address: address as `0x${string}`,
            abi: erc20ABI,
            functionName: 'decimals',
          })) as number;
        } catch (error) {
          console.error('Error fetching decimals', error);
          // Default to 18 decimals if not found
          decimals = 18;
        }

        // If we couldn't get any token info, return null
        if (!symbol && !name) {
          //   toast('Invalid token contract or token does not follow ERC20 standard', 'error');
          return null;
        }

        return {
          address,
          name: name || symbol || 'Unknown Token',
          symbol: symbol || 'UNKNOWN',
          decimals: decimals || 18,
          isCustom: true,
        };
      } catch (error) {
        console.error('Error fetching token info:', error);
        toast('Failed to fetch token information', 'error');
        return null;
      } finally {
        setIsSearching(false);
      }
    },
    [currentChainId, toast]
  );

  // Helper function to convert bytes32 to string
  function hexToString(hex: string): string {
    try {
      // Remove '0x' prefix and any trailing zeros
      const cleaned = hex.replace('0x', '').replace(/00+$/, '');
      // Convert hex to string
      const str = Buffer.from(cleaned, 'hex').toString();
      // Remove any null characters
      return str.replace(/\0/g, '');
    } catch (error) {
      return '';
    }
  }

  const handleCustomAddressChange = async (value: string) => {
    setCustomAddress(value);
    if (value.length === 42 && value.startsWith('0x')) {
      const tokenInfo = await searchTokenOnChain(value);
      if (tokenInfo) {
        setCustomSymbol(tokenInfo.symbol);
        setCustomDecimals(tokenInfo.decimals.toString());
      }
    }
  };

  const handleImport = () => {
    try {
      setIsLoading(true);

      if (!customAddress) {
        throw new Error('Please enter a valid token address');
      }

      const tokenInfo = {
        address: customAddress,
        name: customSymbol,
        symbol: customSymbol,
        decimals: Number(customDecimals),
        isCustom: true,
      };

      importToken(tokenInfo, currentChainId);

      toast('Token imported successfully');
      onImportSuccess?.();
      onClose();
    } catch (error: any) {
      console.log('error', error);
      toast(error.message || 'Failed to import token', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasicModal
      open={isOpen}
      onClose={onClose}
      size="md"
    >
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-neutral">Import token</h2>
        </div>

        <div>
          <div className="bg-yellow-900/20 border border-yellow-600/20 rounded-lg p-4 mb-4">
            <div className="flex gap-2 items-start">
              <span className="text-yellow-500 text-xl">⚠️</span>
              <p className="text-sm text-neutral/70">
                Anyone can create a token, including creating fake versions of existing tokens.
                Learn about scams and security risks.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral mb-1">
                Token contract address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e) => handleCustomAddressChange(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary-900 rounded-lg text-neutral placeholder-neutral/50"
                  placeholder="0x..."
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral mb-1">Token symbol</label>
              <input
                type="text"
                value={customSymbol}
                onChange={(e) => setCustomSymbol(e.target.value)}
                className="w-full px-4 py-3 bg-secondary-900 rounded-lg text-neutral placeholder-neutral/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral mb-1">Token decimal</label>
              <input
                type="number"
                value={customDecimals}
                placeholder="0"
                onChange={(e) => setCustomDecimals(e.target.value)}
                className="w-full px-4 py-3 bg-secondary-900 rounded-lg text-neutral placeholder-neutral/50"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <ButtonCustom
            onClick={handleImport}
            disabled={!customAddress || isLoading}
            loading={isLoading}
            className="w-full"
          >
            Import
          </ButtonCustom>
        </div>
      </div>
    </BasicModal>
  );
}
