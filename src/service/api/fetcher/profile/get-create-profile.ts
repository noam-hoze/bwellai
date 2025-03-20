import { Client } from "../../api.client";

const getCreateProfile = () => `/user/create-profile`;
const getSaveUserSource = ({ source }: { source: string }) =>
  `/user/source?source=${source}`;

export const getCreateProfileFetcher = (payload) => {
  return Client.post(getCreateProfile(), payload);
};
export const getSaveUserSourceFetcher = ({ source }) => {
  return Client.post(getSaveUserSource({ source }), {});
};
