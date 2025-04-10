import { useMutation } from "@tanstack/react-query";
import {
  getAlternativePerspectiveUserReportFetcher,
  getUserReportLatestResultByDateFetcher,
} from "../../api/fetcher/ocr/get-report-alternative-perspective";

export const useGetAlternativePerspectiveUserReportData = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getAlternativePerspectiveUserReportFetcher,
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
export const useGetUserReportLatestResultByDate = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getUserReportLatestResultByDateFetcher,
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
