import {
  getSavedUserGoalFetcher,
  getUserGoalDetailsFetcher,
  getUserGoalExerciseDetailsFetcher,
  saveUserGoalFetcher,
} from "@/service/api/fetcher/goals/get-goal-details";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUserGoalDetails = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-goal-details"],
    queryFn: () => getUserGoalDetailsFetcher(),
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

export const useUserGoalExerciseDetails = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-goal-details-exercise"],
    queryFn: () => getUserGoalExerciseDetailsFetcher(),
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

export const useSaveUserGoalFetcher = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: saveUserGoalFetcher,
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

export const useGetSavedUserGoal = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-goal-details-saved"],
    queryFn: () => getSavedUserGoalFetcher(),
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
