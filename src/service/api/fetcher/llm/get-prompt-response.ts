import { Client } from "../../api.client";

const getPromptResponse = (llm_type: string) =>
  `/prompt/generate?llm_type=${llm_type}`;

export const getPromptResponseFetcher = ({
  llm_type,
  prompt,
}: {
  llm_type: string;
  prompt: string;
}) => {
  return Client.post(getPromptResponse(llm_type), { prompt });
};
