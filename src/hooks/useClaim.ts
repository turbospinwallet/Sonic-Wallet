import useNotification from '@/hooks/useNotification';
import { useModalState } from '@/modules/shared/state/modal-state';
import { useAppState } from '@/modules/shared/state/app-state';

import { useWallet } from '@/hooks/useWallet';

const useClaim = () => {
  const { closeUpgradeModal } = useModalState();
  const { wallet, address } = useWallet();
  const { refreshUserClaimInfo, refreshBalance } = useAppState();
  const toast = useNotification();
  // const { getCoinBalance } = useCoins(address);
  // const suiBalance = getCoinBalance(SUI_TYPE_ARG).balance;

  // return useMutation({
  //   mutationFn: async () => {
  //     if (!wallet?.privateKey) {
  //       throw new Error('Wallet not found');
  //     }

  //     if (new BigNumber(DEFAULT_GAS_BUDGET).gt(new BigNumber(suiBalance))) {
  //       throw new Error('Please try again. Make sure you enough SUI to pay for the gas!');
  //     }

  //     const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
  //     const txb = new TransactionBlock();

  //     txb.moveCall({
  //       target: `${GAME_CONTRACT}::game::claim`,
  //       arguments: [txb.object(GAME_INFO_CONTRACT), txb.object('0x6')],
  //     });

  //     const _wallet = importWalletByPrivateKey(wallet?.privateKey as string);

  //     const resp = await client.signAndExecuteTransactionBlock({
  //       signer: _wallet?.keyPair,
  //       transactionBlock: txb,
  //       options: {
  //         showEffects: true,
  //       },
  //     });

  //     if (resp?.effects?.status?.status !== 'success') {
  //       throw new Error('Please try again. Make sure you are paying enough gas!');
  //     }

  //     const finalResp = await client.waitForTransactionBlock(resp);

  //     return finalResp.digest;
  //   },
  //   onSuccess: () => {
  //     toast('Claim successfully');
  //     refreshUserClaimInfo();
  //     refreshBalance();
  //     closeUpgradeModal();
  //   },
  //   onError: (e) => {
  //     toast(e.message || 'Please try again. Make sure you are paying enough gas!', 'error');
  //   },
  // });
};

export default useClaim;
