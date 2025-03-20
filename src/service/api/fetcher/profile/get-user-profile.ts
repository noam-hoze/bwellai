import { Client } from "../../api.client";

const getUserProfile = () => `/user/get-profile`;
const getUserAdditionalDetails = () => `/user/additional-details`;

export const getUserProfileFetcher = () => {
  return Client.get(getUserProfile());
};

export const getUserAdditionalDetailsFetcher = () => {
  return Client.get(getUserAdditionalDetails());
};
