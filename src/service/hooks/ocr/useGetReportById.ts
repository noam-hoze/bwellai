import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    retry: 0,
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

export const useGetUserLastReportIDsData = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["get-user-previous-report-ids-list"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getUserLastReportIDsFetcher({ size: 10, page: pageParam }),
    initialPageParam: 0,
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.payload?.content?.length
        ? allPages?.length
        : undefined;
    },
  });

  return {
    data: data,
    error,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  };
};
