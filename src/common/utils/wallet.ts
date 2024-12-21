import { createWalletClient, http } from 'viem';
import type { HDAccount } from 'viem/accounts';
import { english, generateMnemonic, mnemonicToAccount, privateKeyToAccount } from 'viem/accounts';
import { sonicMainnetChain } from '@/common/connectors';
import type { ICWalletInfoStorage } from '@/common/interfaces';
import type { TokenInfo } from '@/types/token';
import reactiveStorage from '@/internals/reactive-storage';
export function createNewWalletBySeedPhrase(): ICWalletInfoStorage {
  // Generate mnemonic with English wordlist
  const mnemonic = generateMnemonic(english);

  // Create account from mnemonic
  const account = mnemonicToAccount(mnemonic) as HDAccount;

  const privateKey = `0x${Buffer.from(account.getHdKey().privateKey!).toString('hex')}`;

  // Create wallet client with mainnet chain
  createWalletClient({
    account,
    chain: sonicMainnetChain,
    transport: http(),
  });

  return {
    address: account.address,
    privateKey,
    publicKey: account.publicKey,
    mnemonic,
  };
}

export function importWalletByPrivateKey(privateKey: string): ICWalletInfoStorage {
  // Ensure private key has 0x prefix
  const formattedKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;

  try {
    // Create account from private key using viem
    const account = privateKeyToAccount(formattedKey as `0x${string}`);

    // Create wallet client with mainnet chain
    createWalletClient({
      account,
      chain: sonicMainnetChain,
      transport: http(),
    });

    // Return wallet info formatted for Sonic chain
    return {
      address: account.address,
      privateKey: formattedKey,
      publicKey: account.publicKey,
      mnemonic: '', // No mnemonic for private key imports
    };
  } catch (error) {
    throw new Error('Invalid private key format');
  }
}

export function importWalletBySeedPhrase(input: string): ICWalletInfoStorage {
  try {
    // Check if input is a private key
    if (input.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
      return importWalletByPrivateKey(input);
    }

    // Try as mnemonic
    const account = mnemonicToAccount(input) as HDAccount;
    const privateKey = `0x${Buffer.from(account.getHdKey().privateKey!).toString('hex')}`;

    return {
      address: account.address,
      privateKey,
      publicKey: account.publicKey,
      mnemonic: input,
    };
  } catch (error) {
    throw new Error('Invalid seed phrase or private key format');
  }
}

export function importToken(tokenInfo: TokenInfo, chainId: number) {
  const formattedAddress = tokenInfo.address.startsWith('0x')
    ? tokenInfo.address
    : `0x${tokenInfo.address}`;

  // Save to storage
  const importedTokens = reactiveStorage.get('IMPORTED_TOKENS') || {};
  reactiveStorage.set('IMPORTED_TOKENS', {
    ...importedTokens,
    [chainId]: {
      ...(importedTokens[chainId] || {}),
      [formattedAddress]: tokenInfo,
    },
  });
}

export function getImportedTokens(chainId: number): TokenInfo[] {
  const importedTokens = reactiveStorage.get('IMPORTED_TOKENS');
  if (!importedTokens || !importedTokens[chainId]) {
    return [];
  }
  return Object.values(importedTokens[chainId]);
}

export function removeImportedToken(tokenAddress: string, chainId: number): void {
  const importedTokens = reactiveStorage.get('IMPORTED_TOKENS');
  if (!importedTokens || !importedTokens[chainId]) {
    return;
  }

  const chainTokens = importedTokens[chainId];
  delete chainTokens[tokenAddress];

  reactiveStorage.set('IMPORTED_TOKENS', {
    ...importedTokens,
    [chainId]: chainTokens,
  });
}
