import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { NETWORK } from '@/common/constants/const';

export interface CoinObject {
  objectId: string;
  balance: bigint;
  type: string;
}

export async function getOwnedCoin(
  address: string,
  coinType: string,
  options?: { amount?: bigint }
): Promise<CoinObject[]> {
  const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });

  // Get all coins owned by the address of the given type
  const { data: coins } = await client.getCoins({
    owner: address,
    coinType,
  });

  // Convert coin data to CoinObject format
  const coinObjects = coins.map((coin) => ({
    objectId: coin.coinObjectId,
    balance: BigInt(coin.balance),
    type: coin.coinType,
  }));

  if (!options?.amount) {
    return coinObjects;
  }

  // If amount is specified, find coins that sum up to at least that amount
  const amount = options.amount;
  const selectedCoins: CoinObject[] = [];
  let selectedBalance = BigInt(0);

  for (const coin of coinObjects) {
    selectedCoins.push(coin);
    selectedBalance += coin.balance;
    if (selectedBalance >= amount) {
      break;
    }
  }

  if (selectedBalance < amount) {
    return [];
  }

  return selectedCoins;
}
