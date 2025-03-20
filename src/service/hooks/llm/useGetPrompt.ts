import { useQuery } from "@tanstack/react-query";
import { getUserPromptFetcher } from "../../api/fetcher/llm/get-user-prompt";

export const useGetPromptData = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-save-prompt"],
    queryFn: () => getUserPromptFetcher(),
  });

  return {
    data: data?.data?.payload,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
