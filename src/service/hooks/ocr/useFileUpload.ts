import { useMutation } from "@tanstack/react-query";
import {
  getUserBiomarkerReportDataFetcher,
  getUserPanelAnalysisReportDataFetcher,
  getUserReportUploadFetcher,
} from "../../api/fetcher/ocr/pdf-upload";

export const useUserReportFileUpload = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getUserReportUploadFetcher,
  });

  return {
    data: data?.data,
    error: error as any,
    isError,
    isPending,
    isSuccess,
    mutate,
  };
};

export const useGetUserBiomarkerReportData = () => {
  const { data, error, isError, isPending, isSuccess, mutate, mutateAsync } =
    useMutation({
      mutationFn: getUserBiomarkerReportDataFetcher,
    });

  return {
    data: data?.data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
    mutateAsync,
  };
};

export const useGetUserPanelAnalysisReportData = () => {
  const { data, error, isError, isPending, isSuccess, mutate, mutateAsync } =
    useMutation({
      mutationFn: getUserPanelAnalysisReportDataFetcher,
    });

  return {
    data: data?.data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
    mutateAsync,
  };
};
