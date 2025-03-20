import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAddRiskScoreFetcher,
  getReportDetailsFetcher,
  getRiskScoreFetcher,
} from "../../api/fetcher/risk-score/getReportDetails";

export const useGetReportDetails = ({ testName, isAuthenticated }) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: () => getReportDetailsFetcher(testName),
    queryKey: ["get-report-data-risk-profile", testName],
    enabled: isAuthenticated,
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

export const useGetRiskScore = ({ calculatorName, isAuthenticated }) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: () => getRiskScoreFetcher({ calculatorName }),
    queryKey: ["get-user-risk-score", calculatorName],
    enabled: isAuthenticated,
    retry: 0,
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

export const useGetAddRiskScore = () => {
  const { data, error, isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: getAddRiskScoreFetcher,
  });

  return {
    data: data?.data,
    error: error as any,
    isError,
    isSuccess,
    isPending,
    mutate,
  };
};
