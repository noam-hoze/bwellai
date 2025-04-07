import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCreateUserWalletFetcher,
  getUserWalletBalanceFetcher,
  getUserWalletFetcher,
  getUserWalletMonthlyBalanceFetcher,
  getUserWalletTransactionFetcher,
} from "../../api/fetcher/wallet/user-wallet";

export const useGetUserWalletData = ({ isAuthenticated }) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-wallet-data-by-email"],
    queryFn: () => getUserWalletFetcher(),
    enabled: isAuthenticated,
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

export const useGetCreateUserWalletData = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getCreateUserWalletFetcher,
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

export const useGetUserWalletBalance = ({
  refetchIntervalInBackground,
  isAuthenticated,
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-wallet-balance"],
    queryFn: () => getUserWalletBalanceFetcher(),
    //Keep refetching every 5 seconds while we don't stop it
    refetchInterval: refetchIntervalInBackground ? 5000 : false,
    refetchIntervalInBackground: refetchIntervalInBackground,
    enabled: isAuthenticated,
  });

  return {
    data: data?.data?.payload,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
export const useGetUserWalletMonthlyBalance = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-wallet-balance-monthly-v4"],
    queryFn: () => getUserWalletMonthlyBalanceFetcher(),
    //Keep refetching every 5 seconds while we don't stop it
    // refetchInterval: refetchIntervalInBackground ? 5000 : false,
    // refetchIntervalInBackground: refetchIntervalInBackground,
    // enabled: isAuthenticated,
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
export const useGetUserWalletTransaction = (
  size: number,
  page: number,
  isAuthenticated
) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-wallet-Transaction", size, page],
    queryFn: () => getUserWalletTransactionFetcher(size, page),
    placeholderData: (previousData) => previousData,
    enabled: isAuthenticated,
  });

  return {
    data: data?.data?.payload,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
