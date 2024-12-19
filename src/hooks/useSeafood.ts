import { useModalState } from '@/modules/shared/state/modal-state';
import useNotification from '@/hooks/useNotification';
import { useAppState } from '@/modules/shared/state/app-state';

import { useWallet } from '@/hooks/useWallet';

const useSeafood = () => {
  const { closeUpgradeModal } = useModalState();
  const { address } = useWallet();
  // const { getCoinBalance } = useCoins(address);
  // const suiBalance = getCoinBalance(SUI_TYPE_ARG).balance;
  const { wallet } = useWallet();
  const { refreshUserClaimInfo, refreshBalance } = useAppState();
  const toast = useNotification();

  // return useMutation({
  //   mutationFn: async (priceUpgrade: bigint) => {
  //     if (!wallet?.privateKey) {
  //       throw new Error('Wallet not found');
  //     }

  //     const price = BigInt(priceUpgrade) + BigInt(DEFAULT_GAS_BUDGET);

  //     // @ts-expect-error ignore
  //     if (new BigNumber(price).gt(new BigNumber(suiBalance))) {
  //       throw new Error('Insufficient SUI to upgrade! Please deposit SUI to continue.');
  //     }

  //     const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
  //     const txb = new TransactionBlock();

  //     const listCoins = await getOwnedCoin(wallet.address, SUI_TYPE_ARG, {
  //       amount: price,
  //     });

  //     if (listCoins.length === 0) {
  //       throw new Error('Insufficient SUI to upgrade! Please deposit SUI to continue.');
  //     }
  //     const coin = createTransferSuiCoinTxb(priceUpgrade, txb);
  //     // txb.setGasBudget('10000000');

  //     txb.moveCall({
  //       target: `${GAME_CONTRACT}::gold_seafood::upgrade_seafood`,
  //       arguments: [txb.object(SEAFOOD_CONTRACT), txb.object(GAME_INFO_CONTRACT), coin],
  //     });

  //     const _wallet = importWalletByPrivateKey(wallet?.privateKey as string);
  //     txb.setGasBudget(10000000);
  //     txb.setSender(_wallet.keyPair.toSuiAddress());
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
  //     toast('Upgrade successfully');
  //     refreshUserClaimInfo();
  //     refreshBalance();
  //     closeUpgradeModal();
  //   },
  //   onError: (e) => {
  //     toast(e.message || 'Please try again. Make sure you are paying enough gas!', 'error');
  //     // show toast error
  //   },
  // });
};

export default useSeafood;
