import { useQuery } from "@tanstack/react-query";
import { getUserWearableAuthorizeFetcher } from "../../api/fetcher/wearable/user-health-info";

export const useGetUserWearableAuthorizeURL = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-wearable-auth-url"],
    queryFn: () => getUserWearableAuthorizeFetcher(),
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
