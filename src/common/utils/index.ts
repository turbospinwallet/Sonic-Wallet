// import { Coin as CoinAPI } from '@mysten/sui.js';
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import type { TransactionBlock } from '@mysten/sui.js/transactions';
import type { CoinStruct } from '@mysten/sui/client';

export interface CoinObject {
  objectId: string;
  type: string;
  balance: bigint;
  previousTransaction: string;
  object: CoinStruct; // raw data
}

export async function getOwnedCoin(
  address: string,
  coinType: string,
  filterOptions?: {
    amount?: bigint;
  }
): Promise<CoinObject[]> {
  const coins: CoinObject[] = [];
  let hasNextPage = true;
  let nextCursor = null;

  // NOTE: potential performance issue if there are too many coins
  // only fetch coins until the amount is enough
  let currentAmount = BigInt(0);
  // solution: add an amount parameter to determine how many coin objects should be fetch
  while (hasNextPage) {
    const client = new SuiClient({ url: getFullnodeUrl('testnet') });

    const resp: any = await client.getCoins({
      owner: address,
      coinType,
      cursor: nextCursor,
    });

    resp.data.forEach((item: CoinStruct) => {
      const coinBalance = BigInt(item.balance);
      coins.push({
        type: item.coinType,
        objectId: item.coinObjectId,
        balance: coinBalance,
        previousTransaction: item.previousTransaction,
        object: item,
      });
      currentAmount += coinBalance;
    });

    if (typeof filterOptions?.amount === 'bigint' && currentAmount >= filterOptions.amount) {
      break;
    }

    hasNextPage = resp.hasNextPage;
    nextCursor = resp.nextCursor;
  }
  return coins;
}

export function createTransferSuiCoinTxb(amount: bigint, txb: TransactionBlock) {
  // split the coin to be sent from the gas coins
  const coin = txb.splitCoins(txb.gas, [txb.pure(amount)]);
  return coin;
}

export const createTransferCoinTxb = (
  coins: CoinObject[],
  amount: bigint,
  txb: TransactionBlock
) => {
  const [primaryCoin, ...mergeCoins] = coins;
  // TODO: pass the object instead of the id
  const primaryCoinInput = txb.object(primaryCoin.objectId);
  if (mergeCoins.length) {
    // TODO: This could just merge a subset of coins that meet the balance requirements instead of all of them.
    txb.mergeCoins(
      primaryCoinInput,
      mergeCoins.map((coin) => txb.object(coin.objectId))
    );
  }
  // TODO: pass gas coin object instead of pure amount, which can avoid unnecessary network calls
  const coin = txb.splitCoins(primaryCoinInput, [txb.pure(amount)]);

  return coin;
};
