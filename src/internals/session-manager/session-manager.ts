import type {
  SavedUserCredential,
  UserCredential,
} from '@/internals/session-manager/session-manager-types';

export interface SessionManagerStorage {
  saveCredential(credential: SavedUserCredential): Promise<void>;
  getCredential(address: string): Promise<SavedUserCredential | null>;
  clearCredential(): Promise<void>;
}

export interface SessionManagerOptions {
  storage: SessionManagerStorage;
  accountRepo: {
    getChallenge(address: string): Promise<string>;
    authorize(credential: { address: string; signature: string }): Promise<UserCredential>;
    refreshToken(refreshToken: string): Promise<UserCredential>;
  };
}

export interface SessionManager {
  init: (currentWalletAddress: string) => Promise<void>;
  startSession: (params: NewSessionParams) => Promise<void>;
  refreshSession: () => Promise<void>;
  reclaimSession: (address: `0x${string}`) => Promise<void>;
  onSessionChanged: (fn: (currentWallet: SavedUserCredential | null) => void) => () => void;
  getCurrentSession: () => string | null;
  invalidateSession: <Action extends 'redirect' | 'reload' | 'nothing'>(
    ...args: Action extends 'redirect' ? [Action, string] : [Action]
  ) => Promise<void>;
  getToken: () => Promise<string | null>;
}

interface NewSessionParams {
  address: string;

  requestSign(nonce: string): Promise<string>;
}

export default function createSessionManager({
  accountRepo,
  storage,
}: SessionManagerOptions): SessionManager {
  let currentWalletAddress: null | SavedUserCredential = null;
  const listeners = new Set<(currentWallet: SavedUserCredential | null) => void>();

  function setCurrentSession(_credential: SavedUserCredential | null) {
    currentWalletAddress = _credential;
    listeners.forEach((listener) => listener(_credential));
  }

  async function invalidateSession<Action extends 'redirect' | 'reload' | 'nothing'>(
    ...args: Action extends 'redirect' ? [Action, string] : [Action]
  ) {
    await storage.clearCredential();
    setCurrentSession(null);

    const [action] = args;
    if (action === 'redirect') {
      const [, str] = args;
      window.location.href = str;
    }

    if (action === 'reload') {
      window.location.reload();
    }
  }

  async function refreshSession(address?: string) {
    const realAddress = address ?? currentWalletAddress?.address;
    if (!realAddress) {
      return;
    }

    const credential = await storage.getCredential(realAddress);
    if (!credential || !credential.refreshToken) {
      throw new Error('Refresh token not exist');
    }

    try {
      const baseCredential = await accountRepo.refreshToken(credential.refreshToken);

      const savedCredential: SavedUserCredential = {
        ...baseCredential,
        address: realAddress,
      };
      await storage.saveCredential(savedCredential);
      setCurrentSession(savedCredential);
    } catch (e) {
      await invalidateSession('nothing');

      throw e;
    }
  }

  return {
    refreshSession,
    invalidateSession,
    getCurrentSession: () => currentWalletAddress?.address ?? null,
    async reclaimSession(address) {
      const credential = await storage.getCredential(address);
      if (!credential) {
        return;
      }

      try {
        await refreshSession(address);

        setCurrentSession(credential);
      } catch (e) {
        await invalidateSession('nothing');
      }
    },
    async init(address: string) {
      const credential = await storage.getCredential(address);

      if (!credential || !credential.token || !credential.refreshToken) {
        return;
      }

      setCurrentSession({
        address: credential.address,
        token: credential.token,
        refreshToken: credential.refreshToken,
      });
    },
    async getToken(): Promise<string | null> {
      if (!currentWalletAddress) {
        return null;
      }
      const x = await storage.getCredential(currentWalletAddress.address);

      return x?.token ?? null;
    },
    async startSession({ address, requestSign }: NewSessionParams) {
      const challengeCode = await accountRepo.getChallenge(address);

      const signedCode = await requestSign(challengeCode);

      const baseCredential = await accountRepo.authorize({
        address,
        signature: signedCode,
      });

      const savedCredential: SavedUserCredential = {
        ...baseCredential,
        address,
      };
      await storage.saveCredential(savedCredential);
      setCurrentSession(savedCredential);
    },
    onSessionChanged(
      fn: (currentWallet: SavedUserCredential | null) => void,
      {
        runOnRegister = true,
      }: {
        runOnRegister?: boolean;
      } = {}
    ) {
      listeners.add(fn);

      if (runOnRegister) {
        fn(currentWalletAddress);
      }

      return () => {
        listeners.delete(fn);
      };
    },
  };
}
