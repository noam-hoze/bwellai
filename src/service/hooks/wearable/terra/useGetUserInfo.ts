import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDeleteUserWearableDeviceFetcher,
  getDeviceAuthURLFetcher,
  getUpdateConnectedDeviceFetcher,
  getUserInfoFetcher,
  getWearableDataFetcher,
  getWearableDataFetcherV2,
  getWearableElasticSearchDataFetcher,
  getWearableElasticSearchHistoricalDataFetcher,
  getWearableElasticSearchHistoricalDataFetcherV2,
  getWearableGraphDataV3Fetcher,
} from "../../../api/fetcher/wearable/terra/user-info";

export const useGetUserInfoTerraData = ({ isAuthenticated }) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-info-terra"],
    queryFn: getUserInfoFetcher,
    enabled: isAuthenticated,
  });

  return { data: data?.data, error, isError, isLoading, isSuccess, refetch };
};

export const useGetWearableGraphDataV3 = ({
  isAuthenticated,
  resource,
  startDate,
  endDate,
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-wearable-graph-data-v3", resource, startDate, endDate],
    queryFn: () =>
      getWearableGraphDataV3Fetcher({ resource, startDate, endDate }),
    placeholderData: (previousData) => previousData,
    enabled: isAuthenticated,
  });

  return { data: data?.data, error, isError, isLoading, isSuccess, refetch };
};

export const useGetDeviceAuthURL = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getDeviceAuthURLFetcher,
  });

  return { data: data?.data, error, isError, isPending, isSuccess, mutate };
};
export const useGetUpdateConnectedDeviceFetcher = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getUpdateConnectedDeviceFetcher,
  });

  return { data: data?.data, error, isError, isPending, isSuccess, mutate };
};
export const useGetDeleteUserWearableDeviceFetcher = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getDeleteUserWearableDeviceFetcher,
  });

  return { data: data?.data, error, isError, isPending, isSuccess, mutate };
};

export const useGetTerraWearableDataV2 = () => {
  const { data, error, isError, isPending, isSuccess, mutateAsync } =
    useMutation({
      mutationFn: getWearableDataFetcherV2,
    });

  return {
    data: data?.data,
    error,
    isError,
    isPending,
    isSuccess,
    mutateAsync,
  };
};
export const useGetWearableElasticSearchHistoricalDataV2 = (
  device,
  timeZone,
  date,
  isAuthenticated
) => {
  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: [
      "get-wearable-terra-elastic-search-data-v2",
      device,
      timeZone,
      date,
    ],
    queryFn: () =>
      getWearableElasticSearchHistoricalDataFetcherV2({
        device,
        timeZone,
        date,
      }),
    enabled: isAuthenticated,
  });

  return {
    data: data?.data,
    error,
    isError,
    isLoading,
    isSuccess,
  };
};

export const useGetTerraWearableData = (device: string, isEnable: string) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-wearable-terra-data", device],
    queryFn: () => getWearableDataFetcher(device),
    enabled: isEnable ? true : false,
  });

  return { data: data?.data, error, isError, isLoading, isSuccess, refetch };
};

export const useGetWearableElasticSearchData = (
  device: string,
  isEnable: string
) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-wearable-terra-elastic-search-data", device],
    queryFn: () => getWearableElasticSearchDataFetcher(device),
    enabled: isEnable ? true : false,
  });

  return { data: data?.data, error, isError, isLoading, isSuccess, refetch };
};

export const useGetWearableElasticSearchHistoricalData = (
  device: string,
  timeZone: string,
  type: string
) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: [
      "get-wearable-terra-elastic-search-historical-data",
      device,
      timeZone,
      type,
    ],
    queryFn: () =>
      getWearableElasticSearchHistoricalDataFetcher(device, timeZone, type),
    enabled: device ? true : false,
  });

  return { data: data?.data, error, isError, isLoading, isSuccess, refetch };
};
