import { gql } from '@apollo/client';

export const GET_COIN_HISTORY = gql`
  query CoinHistory($address: Address!, $coinTypes: [String!]) {
    coins(address: $address, coinTypes: $coinTypes) {
      type
      symbol
      iconURL
      usdPrice
      pricePercentChange24h
      day: history(interval: "day", length: 60) {
        timestamp
        price
      }
      hour: history(interval: "hour", length: 24) {
        timestamp
        price
      }
      minute: history(interval: "minute", length: 60) {
        timestamp
        price
      }
    }
  }
`;
