import type { StorageKey } from 'src/packages/reactive-storage';
import { createStorageOption } from 'src/packages/reactive-storage';

export interface SavedUserCredential {
  address: string;
  privateKey?: string;
  mnemonic?: string;
  encryptedMnemonic?: string;
  encryptedPrivateKey?: string;
  token?: string;
  name?: string;
}

export const USER_CREDENTIAL: StorageKey<Record<string, SavedUserCredential>> = createStorageOption(
  {
    deserialize: true,
    persistent: false,
  }
);

export const ACTIVE_WALLET: StorageKey<Record<string, string>> = createStorageOption({
  deserialize: true,
  persistent: false,
});

export const REFERRAL: StorageKey<string> = createStorageOption({
  deserialize: true,
  persistent: false,
});

export const CHECK_COMPLETE_TASK_DELAY: StorageKey<Record<string, number>> = createStorageOption({
  deserialize: true,
  persistent: false,
});
