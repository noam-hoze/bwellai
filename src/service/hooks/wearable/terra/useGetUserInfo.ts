import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDeleteUserWearableDeviceFetcher,
  getDeviceAuthURLFetcher,
  getUpdateConnectedDeviceFetcher,
  getUserInfoFetcher,
  getWearableDailyDataV4Fetcher,
  getWearableDailyRecommendationDataV4Fetcher,
  getWearableDataFetcher,
  getWearableDataFetcherV2,
  getWearableElasticSearchDataFetcher,
  getWearableElasticSearchHistoricalDataFetcher,
  getWearableElasticSearchHistoricalDataFetcherV2,
  getWearableGraphDataV3Fetcher,
  getWearableWeeklyDataV4Fetcher,
  getWearableWeeklyRecommendationDataV4Fetcher,
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

export const useGetWearableDailyRecommendationDataV4 = ({
  resource,
  startDate,
  language,
  isEnable,
}: {
  resource: string;
  startDate: string;
  language: string;
  isEnable: string;
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: [
      "get-wearable-daily-recommendation-data-v4",
      resource,
      startDate,
      language,
    ],
    queryFn: () =>
      getWearableDailyRecommendationDataV4Fetcher(
        resource,
        startDate,
        language
      ),
    placeholderData: (previousData) => previousData,
    enabled: isEnable ? true : false,
  });

  return { data: data?.data, error, isError, isLoading, isSuccess, refetch };
};
export const useGetWearableWeeklyRecommendationDataV4 = ({
  language,
  isEnable,
}: {
  language: string;
  isEnable: string;
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-wearable-weekly-recommendation-data-v4", language],
    queryFn: () => getWearableWeeklyRecommendationDataV4Fetcher(language),
    placeholderData: (previousData) => previousData,
    enabled: isEnable ? true : false,
  });

  return { data: data?.data, error, isError, isLoading, isSuccess, refetch };
};
export const useGetWearableDailyDataV4 = ({
  resource,
  startDate,
  isEnable,
}: {
  resource: string;
  startDate: string;
  isEnable: string;
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-wearable-daily-data-v4", startDate, resource],
    queryFn: () => getWearableDailyDataV4Fetcher(resource, startDate),
    placeholderData: (previousData) => previousData,
    enabled: isEnable ? true : false,
  });

  return { data: data?.data, error, isError, isLoading, isSuccess, refetch };
};
export const useGetWearableWeeklyDataV4 = ({
  resource,
  isEnable,
}: {
  resource: string;
  isEnable: string;
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-wearable-weekly-data-v4", resource],
    queryFn: () => getWearableWeeklyDataV4Fetcher(resource),
    placeholderData: (previousData) => previousData,
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
