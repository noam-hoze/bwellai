import { Client } from "../../api.client";

const getUserHealthInfo = () => `/wearable/user/health/info`;
const getUserHealthInfoByUserId = () => `/wearable/user/health/info/id`;
const getUserWearableAuthorize = () => `wearable/user/authorizers`;

export const getUserHealthInfoFetcher = () => {
  return Client.get(getUserHealthInfo());
};
export const getUserHealthInfoByUserIdFetcher = () => {
  return Client.get(getUserHealthInfoByUserId());
};
export const getUserWearableAuthorizeFetcher = () => {
  return Client.get(getUserWearableAuthorize());
};
