import { useQuery } from "@tanstack/react-query";
import {
  getUserOverallStatusFetcher,
  getUserProfileFetcher,
} from "../../api/fetcher/profile/get-user-profile";

export const useGetUserProfile = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: getUserProfileFetcher,
    queryKey: ["get-user-profile"],
    enabled: isAuthenticated,
    // staleTime: 1000,
  });

  return {
    data: data?.data?.payload,
    error,
    isError,
    isSuccess,
    isLoading,
    refetch,
  };
};
export const useGetUserOverallStatus = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: getUserOverallStatusFetcher,
    queryKey: ["get-user-overall-status"],
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
