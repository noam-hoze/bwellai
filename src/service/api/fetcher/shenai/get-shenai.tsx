import { Client } from "../../api.client";

// https://dev.api.wishfy.io/bwell/wearable/face/score/save
const getUserFaceScoreSave = () => `/wearable/face/score/save`;
const getUserFaceScoreLatest = () => `/wearable/face/score/latest`;
const getUserFaceDataSave = () => `/wearable/face/data/save`;
const getUserRiskDetailsByType = ({ detailsType }: { detailsType: string }) =>
  `/risk/details?type=${detailsType}`;
const getUserFaceDataLatest = () => `/wearable/face/data/latest`;

export const getUserRiskDetailsByTypeFetcher = (type) => {
  return Client.get(getUserRiskDetailsByType({ detailsType: type }));
};

export const getUserFaceScoreSaveFetcher = (payload) => {
  return Client.post(getUserFaceScoreSave(), payload);
};

export const getUserFaceDataLatestFetcher = () => {
  return Client.get(getUserFaceDataLatest());
};
export const getUserFaceScoreLatestFetcher = () => {
  return Client.get(getUserFaceScoreLatest());
};

export const getUserFaceDataSaveFetcher = (payload) => {
  return Client.post(getUserFaceDataSave(), payload);
};
