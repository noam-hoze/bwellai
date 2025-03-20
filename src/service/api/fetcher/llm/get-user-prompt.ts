import { Client } from "../../api.client";

const getUserPrompt = () => `/prompt/list`;

export const getUserPromptFetcher = () => {
  return Client.get(getUserPrompt());
};
