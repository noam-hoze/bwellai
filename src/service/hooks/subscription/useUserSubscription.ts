import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAddRequestFreePremiumSubscriptionFetcher,
  getAddUserSelectedSubscriptionFetcher,
  getSubscriptionPaymentCheckoutPageFetcher,
  getUserOrderStatusFetcher,
  getUserSelectedSubscriptionFetcher,
  getUserSubscriptionCatalogFetcher,
  getUserSubscriptionQuotaFetcher,
} from "../../api/fetcher/subscription/getUserSubscription";

export const useGetUserSubscriptionCatalog = () => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: () => getUserSubscriptionCatalogFetcher(),
    queryKey: ["get-user-subscription-catalog"],
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

export const useGetUserSelectedSubscription = (isAuthenticated) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: () => getUserSelectedSubscriptionFetcher(),
    queryKey: ["get-user-selected-subscription"],
    retry: 0,
    enabled: isAuthenticated ? true : false,
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

export const useGetUserSubscriptionQuota = (isAuth, trigger, type) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: () => getUserSubscriptionQuotaFetcher({ type }),
    queryKey: ["get-user-selected-subscription-quota", type, trigger],
    retry: 0,
    enabled: isAuth,
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

export const useGetUserOrderStatusFetcher = ({
  orderId,
  sessionId,
  isEnabled,
}: {
  orderId: string;
  sessionId: string;
  isEnabled: boolean;
}) => {
  const { data, refetch, error, isError, isSuccess, isLoading } = useQuery({
    queryFn: () =>
      getUserOrderStatusFetcher({
        orderId,
        sessionId,
      }),
    queryKey: ["get-user-order-status"],
    retry: 10,
    retryDelay: 5000,
    enabled: isEnabled,
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

export const useGetAddUserSelectedSubscription = () => {
  const { data, error, isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: getAddUserSelectedSubscriptionFetcher,
  });

  return {
    data: data?.data,
    error: (error as any)?.data,
    isError,
    isSuccess,
    isPending,
    mutate,
  };
};

export const useGetAddRequestFreePremiumSubscriptionFetcher = () => {
  const { data, error, isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: getAddRequestFreePremiumSubscriptionFetcher,
  });

  return {
    data: data?.data,
    error: (error as any)?.data,
    isError,
    isSuccess,
    isPending,
    mutate,
  };
};

export const useGetSubscriptionPaymentCheckoutPage = () => {
  const { data, error, isError, isSuccess, isPending, mutate } = useMutation({
    mutationFn: getSubscriptionPaymentCheckoutPageFetcher,
  });

  return {
    data: data?.data?.payload,
    error: (error as any)?.data,
    isError,
    isSuccess,
    isPending,
    mutate,
  };
};
