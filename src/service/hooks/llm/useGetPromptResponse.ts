import { useMutation } from "@tanstack/react-query";
import { getPromptResponseFetcher } from "../../api/fetcher/llm/get-prompt-response";

export const useGetPromptResponse = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getPromptResponseFetcher,
  });

  return {
    data: data?.data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
  };
};
