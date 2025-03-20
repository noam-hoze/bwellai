import { Client } from "../../api.client";

// https://dev.api.wishfy.io/bwell/wearable/face/score/save
const getUserFaceScoreSave = () => `/wearable/face/score/save`;
const getUserRiskDetailsByType = ({ detailsType }: { detailsType: string }) =>
  `/risk/details?type=${detailsType}`;

export const getUserRiskDetailsByTypeFetcher = (type) => {
  return Client.get(getUserRiskDetailsByType({ detailsType: type }));
};

export const getUserFaceScoreSaveFetcher = (payload) => {
  return Client.post(getUserFaceScoreSave(), payload);
};
