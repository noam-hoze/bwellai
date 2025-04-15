import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserFaceDataLatestFetcher,
  getUserFaceDataSaveFetcher,
  getUserFaceScoreLatestFetcher,
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

export const useGetUserFaceDataLatest = (isAuthenticated: boolean) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: getUserFaceDataLatestFetcher,
    queryKey: ["get-user-face-risk-data-latest"],
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
export const useGetUserFaceScoreLatestFetcher = (isAuthenticated: boolean) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: getUserFaceScoreLatestFetcher,
    queryKey: ["get-user-wellness-score-data-latest"],
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

export const useGetUserFaceDataSave = () => {
  const { data, mutate, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: getUserFaceDataSaveFetcher,
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
