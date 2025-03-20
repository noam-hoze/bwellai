import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserFaceScoreSaveFetcher,
  getUserRiskDetailsByTypeFetcher,
} from "../../api/fetcher/shenai/get-shenai";

export const useGetUserFaceScore = (isAuthenticated: boolean, type: string) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: () => getUserRiskDetailsByTypeFetcher(type),
    queryKey: ["get-user-face-risk-score-save", type],
    enabled: isAuthenticated,
    // staleTime: 1000,
  });

  return {
    data: data?.data,
    error,
    isError,
    isSuccess,
    isLoading,
    refetch,
  };
};

export const useGetUserFaceScoreSave = () => {
  const { data, mutate, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: getUserFaceScoreSaveFetcher,
  });

  return {
    data: data?.data?.payload,
    mutate,
    error,
    isError,
    isSuccess,
    isPending,
  };
};
