import {
  getUserAuthenticateFetcher,
  getUserAuthenticateOTPFetcher,
} from "../../api/fetcher/authentication/authenticate";
import { useMutation } from "@tanstack/react-query";

export const useGenerateOTP = () => {
  const { data, isPending, error, isError, isSuccess, mutate } = useMutation({
    mutationFn: getUserAuthenticateFetcher,
    retry: false,
  });
  return {
    data: data?.data,
    isPending,
    isSuccess,
    isError,
    // error: (error as any)?.data?.errors?.[0],
    mutate,
  };
};

export const useOtpValidation = () => {
  const { data, isPending, error, isSuccess, mutate } = useMutation({
    mutationFn: getUserAuthenticateOTPFetcher,
    retry: false,
  });
  return {
    data: data?.data,
    isPending,
    isSuccess,
    error,
    mutate,
  };
};
