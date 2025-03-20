import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllPromptByUidFetcher,
  getAllPromptFetcher,
  getSavePromptFetcher,
  getUpdatePromptFetcher,
} from "../../api/fetcher/admin/prompt";

export const useGetSavePrompt = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getSavePromptFetcher,
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

export const useGetUpdatePrompt = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getUpdatePromptFetcher,
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

export const useGetAllPrompt = ({ type }: { type: string }) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-all-prompt", type],
    queryFn: () => getAllPromptFetcher({ type }),
  });

  return {
    data: data?.data,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
export const useGetAllPromptByUid = ({ Uid }: { Uid: string }) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-all-prompt-by-uid", Uid],
    queryFn: () => getAllPromptByUidFetcher({ Uid }),
  });

  return {
    data: data?.data,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
