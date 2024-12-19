import createSessionManager from './session-manager';
import type { SavedUserCredential } from '@/internals/session-manager/session-manager-types';
import reactiveStorage from '@/internals/reactive-storage';

const sessionManager = createSessionManager({
  accountRepo: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    getChallenge: async (address) => {
      // const resp = await Kaye.postKayeAuthChallenge({ address });
      // return resp!.challenge!;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async refreshToken(refreshToken: string) {
      // const resp = await Kaye.postKayeAuthRefreshtoken({ refreshToken });
      // return {
      //   refreshToken: resp!.refreshToken!,
      //   token: resp!.token!,
      // };
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    authorize: async ({ address, signature }) => {
      // const resp = await Kaye.postKayeAuthAuthorize({ address, signature });
      // return {
      //   refreshToken: resp!.refreshToken!,
      //   token: resp!.token!,
      // };
    },
  },
  storage: {
    saveCredential(credential) {
      reactiveStorage.set('USER_CREDENTIAL', {
        [credential.address]: credential,
      });

      return Promise.resolve();
    },
    async getCredential(address: string): Promise<SavedUserCredential | null> {
      const authInfo = reactiveStorage.get('USER_CREDENTIAL');

      if (!authInfo) {
        return null;
      }

      if (!authInfo[address]) {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return Promise.resolve(authInfo[address]);
    },
    async clearCredential(): Promise<void> {
      reactiveStorage.clear();

      return Promise.resolve();
    },
  },
});

export default sessionManager;
