import { useMutation } from "@tanstack/react-query";
import {
  getCreateProfileFetcher,
  getSaveUserSourceFetcher,
} from "../../api/fetcher/profile/get-create-profile";

export const useGetCreateProfile = () => {
  const { data, mutate, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: getCreateProfileFetcher,
  });

  return {
    data: data?.data?.payload,
    mutate,
    error,
    isError,
    isSuccess,
    isPending,
  };
};
export const useGetSaveUserSourceFetcher = () => {
  const { data, mutate, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: getSaveUserSourceFetcher,
  });

  return {
    data: data?.data?.payload,
    mutate,
    error,
    isError,
    isSuccess,
    isPending,
  };
};
