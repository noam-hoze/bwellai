import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDeleteUserFoodDataFetcher,
  getDeleteUserFoodProfileDataFetcher,
  getFoodTrackerUploadFetcher,
  getLogFoodDataV4Fetcher,
  getSaveUserFoodProfileDataFetcher,
  getUserDefaultFoodReportUploadFetcher,
  getUserFavouriteFoodv4Fetcher,
  getUserFoodGraphDetailsFetcher,
  getUserFoodProfileListFetcher,
  getUserFoodReportBarCodeDataByReportIdFetcher,
  getUserFoodReportBarCodeDataByReportIdV4Fetcher,
  getUserFoodReportUploadByBarCodeFetcher,
  getUserFoodReportUploadFetcher,
  getUserLatestFoodReportUploadFetcher,
  getUserLoggedMealDataV4Fetcher,
} from "../../api/fetcher/nutrition/get-upload-food";

export const useGetUserFoodReportUpload = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getUserFoodReportUploadFetcher,
  });

  return {
    data: data?.data,
    error: error,
    isError,
    isPending,
    isSuccess,
    mutate,
  };
};
export const useGetLogFoodDataV4Fetcher = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getLogFoodDataV4Fetcher,
  });

  return {
    data: data?.data,
    error: error,
    isError,
    isPending,
    isSuccess,
    mutate,
  };
};
export const useGetUserFoodReportByBarCode = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getUserFoodReportUploadByBarCodeFetcher,
  });

  return {
    data: data?.data,
    error: error,
    isError,
    isPending,
    isSuccess,
    mutate,
  };
};

export const useGetSaveUserFoodProfileData = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getSaveUserFoodProfileDataFetcher,
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
export const useGetFoodTrackerUploadFetcher = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getFoodTrackerUploadFetcher,
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
export const useGetDeleteUserFoodProfileData = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getDeleteUserFoodProfileDataFetcher,
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
export const useGetDeleteUserFoodDataFetcher = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getDeleteUserFoodDataFetcher,
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

export const useGetUserFoodProfileListFetcher = (isAuthenticated: boolean) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-food-profile-list"],
    queryFn: getUserFoodProfileListFetcher,
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

export const useGetUserFoodGraphDetailsFetcher = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-food-graph-details"],
    queryFn: getUserFoodGraphDetailsFetcher,
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

export const useGetUserLoggedMealDataFetcherV4 = (
  date: string,
  isAuthenticated: boolean
) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-logged-meal-data-v4", date],
    queryFn: () => getUserLoggedMealDataV4Fetcher(date),
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
export const useGetUserLatestFoodReportUploadFetcher = (
  isAuthenticated: boolean
) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-latest-food-Report"],
    queryFn: getUserLatestFoodReportUploadFetcher,
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
export const useGetUserDefaultFoodReportUploadFetcher = (
  isAuthenticated: boolean
) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-default-food-Report-data"],
    queryFn: getUserDefaultFoodReportUploadFetcher,
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
export const useGetUserFoodReportBarCodeDataByReportId = ({
  isAuthenticated,
  reportId,
  language,
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-food-barcode-data-by-report-id", reportId],
    queryFn: () =>
      getUserFoodReportBarCodeDataByReportIdFetcher({
        report_id: reportId,
        language,
      }),
    enabled: isAuthenticated && reportId ? true : false,
    retry: 0,
  });

  return {
    data: data?.data,
    error: error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
export const useGetUserFoodReportBarCodeDataByReportIdV4 = ({
  isAuthenticated,
  reportId,
  language,
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-food-barcode-data-by-report-id-v4", reportId],
    queryFn: () =>
      getUserFoodReportBarCodeDataByReportIdV4Fetcher({
        report_id: reportId,
        language,
      }),
    enabled: isAuthenticated && reportId ? true : false,
    retry: 0,
  });

  return {
    data: data?.data,
    error: error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};

export const useGetUserFavouriteFoodV4 = ({ isAuthenticated }) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-favourite-food-v4"],
    queryFn: () => getUserFavouriteFoodv4Fetcher(),
    enabled: isAuthenticated,
    retry: 0,
  });

  return {
    data: data?.data,
    error: error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
