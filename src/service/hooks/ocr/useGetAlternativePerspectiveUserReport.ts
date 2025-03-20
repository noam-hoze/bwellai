import { useMutation } from "@tanstack/react-query";
import { getAlternativePerspectiveUserReportFetcher } from "../../api/fetcher/ocr/get-report-alternative-perspective";

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
