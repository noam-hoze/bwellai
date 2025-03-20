import { useQuery } from "@tanstack/react-query";
import { getUserProfileFetcher } from "../../api/fetcher/profile/get-user-profile";

export const useGetUserProfile = (isAuthenticated) => {
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
