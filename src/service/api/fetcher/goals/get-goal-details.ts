import { Client } from "../../api.client";

const getUserGoalDetails = () => `/goal`;
const getUserGoalExerciseDetails = () => `/goal/exercise`;

const getSavedUserGoal = () => `/goal/user/goals`;
const saveUserGoal = () => `/goal/save`;
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

export const saveUserGoalFetcher = (payload) => {
  return Client.post(saveUserGoal(), payload);
};

export const saveUserGoalActivityFetcher = (payload) => {
  return Client.post(saveUserGoalActivity(), payload);
};
