import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDeleteUserFoodProfileDataFetcher,
  getFoodTrackerUploadFetcher,
  getSaveUserFoodProfileDataFetcher,
  getUserDefaultFoodReportUploadFetcher,
  getUserFoodGraphDetailsFetcher,
  getUserFoodProfileListFetcher,
  getUserFoodReportBarCodeDataByReportIdFetcher,
  getUserFoodReportUploadByBarCodeFetcher,
  getUserFoodReportUploadFetcher,
  getUserLatestFoodReportUploadFetcher,
} from "../../api/fetcher/nutrition/get-upload-food";

export const useGetUserFoodReportUpload = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: getUserFoodReportUploadFetcher,
  });

  return {
    data: data?.data,
    error: error as any,
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
    error: error as any,
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
    error: error as any,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};
