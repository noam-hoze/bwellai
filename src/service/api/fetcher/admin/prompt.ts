// bwell/prompt/save/v2

import { Client } from "../../api.client";

const getSavePrompt = () => `/ocr/prompt/save`;
const getAllPrompt = (type) => `/ocr/prompt/list?type=${type}`;
const getAllPromptByUid = (uid) => `/ocr/prompt?uid=${uid}`;
const getUpdatePrompt = (uid, type) =>
  `/ocr/prompt/update?uid=${uid}&type=${type}`;

// /prompt/v2?uid=Yzg4MDJh
export const getSavePromptFetcher = (payload) => {
  return Client.post(getSavePrompt(), payload);
};
export const getAllPromptFetcher = ({ type }) => {
  return Client.get(getAllPrompt(type));
};
export const getAllPromptByUidFetcher = ({ Uid }) => {
  return Client.get(getAllPromptByUid(Uid));
};
export const getUpdatePromptFetcher = ({ Uid, type }) => {
  return Client.put(getUpdatePrompt(Uid, type), {});
};
