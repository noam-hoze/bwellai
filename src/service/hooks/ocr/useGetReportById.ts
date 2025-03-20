import { useQuery } from "@tanstack/react-query";
import { getUserReportFetcher } from "../../api/fetcher/ocr/get-report";
import { getUserPreviousReportFetcher } from "../../api/fetcher/ocr/get-previous-report";
import { getUserLastReportIDsFetcher } from "../../api/fetcher/ocr/pdf-upload";

export const useGetUserReportData = (
  id: string,
  perspectives: string,
  reportLanguage: string
) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-report-data-by-id", id, perspectives],
    queryFn: () => getUserReportFetcher(id, perspectives, reportLanguage),
    enabled: location.pathname.includes("report"),
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

export const useGetUserPreviousReportData = (
  perspectives: string,
  previousReportId: string,
  isReportFileUploaded: boolean,
  isAuthenticated: boolean,
  reportLanguage: string
) => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    status,
    refetch,
  } = useQuery({
    queryKey: [
      "get-user-previous-report-data-by-id",
      perspectives,
      previousReportId,
      reportLanguage,
    ],
    queryFn: () =>
      getUserPreviousReportFetcher(
        perspectives,
        previousReportId,
        reportLanguage
      ),
    enabled: !isReportFileUploaded && isAuthenticated,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    error,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    status,
    refetch,
  };
};

export const useGetUserLastReportIDsData = (isAuthenticated: boolean) => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    status,
    refetch,
  } = useQuery({
    queryKey: ["get-user-previous-report-ids-list"],
    queryFn: () => getUserLastReportIDsFetcher(),
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data,
    error,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    status,
    refetch,
  };
};
