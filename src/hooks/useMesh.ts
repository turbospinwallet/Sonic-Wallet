import useCoin from '@/hooks/useCoin';
import useNotification from '@/hooks/useNotification';
import { useModalState } from '@/modules/shared/state/modal-state';
import { useAppState } from '@/modules/shared/state/app-state';
import { GOLD_COIN_TYPE } from '@/common/constants/const';
import { useWallet } from '@/hooks/useWallet';

const useMesh = () => {
  const { closeUpgradeModal } = useModalState();
  const { wallet, address } = useWallet();
  const { refreshUserClaimInfo, refreshBalance } = useAppState();
  const toast = useNotification();
  // const { getCoinBalance } = useCoins(address);
  const goldToken = useCoin(GOLD_COIN_TYPE);
  // const suiBalance = getCoinBalance(SUI_TYPE_ARG).balance;

  // return useMutation({
  //   mutationFn: async (priceUpgrade: bigint) => {
  //     if (!wallet?.privateKey) {
  //       throw new Error('Wallet not found');
  //     }
  //     // @ts-expect-error ignore
  //     if (new BigNumber(priceUpgrade).gt(new BigNumber(goldToken.balance))) {
  //       throw new Error('Insufficient GOLD to upgrade! Please deposit GOLD to continue.');
  //     }

  //     if (new BigNumber(DEFAULT_GAS_BUDGET).gt(new BigNumber(suiBalance))) {
  //       throw new Error('Please try again. Make sure you enough SUI to pay for the gas!');
  //     }

  //     const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
  //     const txb = new TransactionBlock();

  //     const listCoins = await getOwnedCoin(wallet.address, GOLD_COIN_TYPE, {
  //       amount: priceUpgrade,
  //     });
  //     const coin = createTransferCoinTxb(listCoins, priceUpgrade, txb);

  //     txb.moveCall({
  //       target: `${GAME_CONTRACT}::game::upgrade_mesh`,
  //       arguments: [txb.object(GAME_INFO_CONTRACT), coin],
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
  //     toast('Upgrade successfully');
  //     refreshUserClaimInfo();
  //     refreshBalance();
  //     closeUpgradeModal();
  //   },
  //   onError: (e) => {
  //     toast(e.message || 'Please try again. Make sure you are paying enough gas!', 'error');
  //   },
  // });
};

export default useMesh;
