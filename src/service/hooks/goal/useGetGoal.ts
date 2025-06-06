import {
  deleteUserGoalFetcher,
  getSavedUserGoalFetcher,
  getUserGoalActivityFetcher,
  getUserGoalDetailsFetcher,
  getUserGoalExerciseDetailsFetcher,
  saveUserGoalActivityFetcher,
  saveUserGoalFetcher,
} from "@/service/api/fetcher/goals/get-goal-details";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUserGoalDetails = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-goal-details"],
    queryFn: () => getUserGoalDetailsFetcher(),
  });

  const enrichedData = data?.data?.map((goal) => ({
    ...goal,
    image: `/images/goals/${goal.goalType}.png`
  }));

  return {
    data: enrichedData,
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

export const useSaveUserGoalActivity = () => {
  const { data, error, isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: saveUserGoalActivityFetcher,
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

export const useUserGoalActivity = ({
  date,
  user_goal_id,
  type,
}: {
  date: string;
  user_goal_id?: string;
  type: string;
}) => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["get-user-goal-activity-details", date, user_goal_id, type],
    queryFn: () => getUserGoalActivityFetcher({ date, user_goal_id, type }),
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

export const useDeleteUserGoal = () => {
  console.log("useDeleteUserGoal hook called");
  const { mutate: deleteUserGoal } = useMutation({
    mutationFn: (goalId: string) => {
      return deleteUserGoalFetcher(goalId);
    },
  });

  return { deleteUserGoal };
};
