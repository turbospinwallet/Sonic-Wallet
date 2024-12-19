import { createWalletClient, http } from 'viem';
import type { HDAccount } from 'viem/accounts';
import {
  english,
  generateMnemonic,
  generatePrivateKey,
  mnemonicToAccount,
  privateKeyToAccount,
} from 'viem/accounts';
import { sonicBlazeChain } from '@/common/connectors';
import type { ICWalletInfoStorage } from '@/common/interfaces';

export function createNewWalletBySeedPhrase(): ICWalletInfoStorage {
  // Generate mnemonic with English wordlist
  const mnemonic = generateMnemonic(english);

  // Create account from mnemonic
  const account = mnemonicToAccount(mnemonic) as HDAccount;

  // Get private key from account
  const privateKey = generatePrivateKey();

  // Create wallet client
  const client = createWalletClient({
    account,
    chain: sonicBlazeChain,
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

    // Create wallet client with Sonic Blaze chain
    const client = createWalletClient({
      account,
      chain: sonicBlazeChain,
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
    const privateKey = generatePrivateKey();

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
