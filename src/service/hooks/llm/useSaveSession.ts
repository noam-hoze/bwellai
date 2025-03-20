import { useMutation } from "@tanstack/react-query";
import { getSaveSessionFetcher } from "../../api/fetcher/llm/get-save-session";

export const useGetSaveSession = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getSaveSessionFetcher,
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
