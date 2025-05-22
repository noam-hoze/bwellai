import { Client } from "../../api.client";

const getUserGoalDetails = () => `/goal`;
const getUserGoalExerciseDetails = () => `/goal/exercise`;

const getSavedUserGoal = () => `/goal/user/goals`;
const saveUserGoal = () => `/goal/save`;
const getUserGoalActivity = ({ date, user_goal_id, type }) =>
  `/goal/activity?date=${date}&user_goal_id=${user_goal_id}&type=${type}`;
const saveUserGoalActivity = () => `/goal/activity/save`;

export const getUserGoalDetailsFetcher = () => {
  return Client.get(getUserGoalDetails());
};

export const getUserGoalExerciseDetailsFetcher = () => {
  return Client.get(getUserGoalExerciseDetails());
};

export const getSavedUserGoalFetcher = () => {
  return Client.get(getSavedUserGoal());
};

export const getUserGoalActivityFetcher = ({
  date,
  user_goal_id,
  type,
}: {
  date: string;
  user_goal_id: string;
  type: string;
}) => {
  return Client.get(getUserGoalActivity({ date, user_goal_id, type }));
};

export const saveUserGoalFetcher = (payload) => {
  return Client.post(saveUserGoal(), payload);
};

export const saveUserGoalActivityFetcher = (payload) => {
  return Client.post(saveUserGoalActivity(), payload);
};
