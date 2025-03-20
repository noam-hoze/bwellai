import { Client } from "../../api.client";

const getUserWallet = () => `/wallet/get`;
const getCreateUserWallet = () => `/wallet/create`;
const getUserWalletBalance = () => `/wallet/balance`;
const getUserWalletTransaction = (size: number, page: number) =>
  `/wallet/transaction?size=${size}&page=${page}`;

export const getUserWalletFetcher = () => {
  return Client.get(getUserWallet());
};

export const getCreateUserWalletFetcher = () => {
  return Client.post(getCreateUserWallet(), {});
};

export const getUserWalletBalanceFetcher = () => {
  return Client.get(getUserWalletBalance());
};
export const getUserWalletTransactionFetcher = (size: number, page: number) => {
  return Client.get(getUserWalletTransaction(size, page));
};
