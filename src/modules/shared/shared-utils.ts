// import { ethers } from 'ethers';
// import type { ServicesNftV2, ServicesStakingContract } from '@/api-models/elidia/data-contracts';
//
// export function nftIsOf(nft: ServicesNftV2) {
//   if (!nft.sex) {
//     return 'avatar';
//   }
//
//   if (nft.sex === 'male') {
//     return 'male';
//   }
//   if (nft.sex === 'female') {
//     return 'female';
//   }
//
//   return 'unknown';
// }
//
// export function isRareNFT(
//   nft: ServicesNftV2,
//   contracts: { [X in 'male' | 'female' | 'avatar']: ServicesStakingContract | undefined }
// ) {
//   const typeOfNft = nftIsOf(nft);
//
//   if (!nft.id?.tokenId) {
//     return false;
//   }
//
//   if (typeOfNft === 'avatar') {
//     if (!contracts.avatar) {
//       return false;
//     }
//
//     return contracts.avatar.rareNftIds?.includes(nft.id.tokenId);
//   }
//
//   if (typeOfNft === 'female') {
//     if (!contracts.female) {
//       return false;
//     }
//     return contracts.female.rareNftIds?.includes(nft.id.tokenId);
//   }
//
//   if (typeOfNft === 'male') {
//     if (!contracts.male) {
//       return false;
//     }
//     return contracts.male.rareNftIds?.includes(nft.id.tokenId);
//   }
//
//   return false;
// }
//
// export function sortNFTById(a: ServicesNftV2, b: ServicesNftV2) {
//   // from lower to higher
//
//   const idA = ethers.utils
//     .parseUnits(ethers.BigNumber.from(a.id?.tokenId).toString() || '', 0)
//     .toNumber();
//   const idB = ethers.utils
//     .parseUnits(ethers.BigNumber.from(b.id?.tokenId).toString() || '', 0)
//     .toNumber();
//   return idA - idB;
// }
//
// export function sortNFTByContract(a: ServicesNftV2, b: ServicesNftV2) {
//   // sort by contract: avatar > male > female
//
//   if (!a.sex && !b.sex) {
//     return 0;
//   }
//   if (!a.sex) {
//     return -1;
//   }
//   if (!b.sex) {
//     return 1;
//   }
//   if (a.sex === b.sex) {
//     return 0;
//   }
//   if (a.sex === 'male') {
//     return -1;
//   }
//   return 1;
// }
