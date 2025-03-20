import { Client } from "../../api.client";

const getSaveSession = () => `/prompt/save`;

export const getSaveSessionFetcher = (payload) => {
  return Client.post(getSaveSession(), payload);
};
