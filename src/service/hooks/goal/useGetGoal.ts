import {
  getSavedUserGoalFetcher,
  getUserGoalDetailsFetcher,
  getUserGoalExerciseDetailsFetcher,
} from "@/service/api/fetcher/goals/get-goal-details";
import { useQuery } from "@tanstack/react-query";

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
    data: data?.data?.payload,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
  };
};

export const useGetSavedUserGoal = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-goal-details-saved"],
    queryFn: () => getSavedUserGoalFetcher(),
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
