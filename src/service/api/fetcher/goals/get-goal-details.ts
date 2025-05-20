import { Client } from "../../api.client";

const getUserGoalDetails = () => `/goal`;
const getUserGoalExerciseDetails = () => `/goal/exercise`;

const getSavedUserGoal = () => `/goal/user/goals`;
const saveUserGoal = () => `/goal/save`;

export const getUserGoalDetailsFetcher = () => {
  return Client.get(getUserGoalDetails());
};

export const getUserGoalExerciseDetailsFetcher = () => {
  return Client.get(getUserGoalExerciseDetails());
};

export const getSavedUserGoalFetcher = () => {
  return Client.get(getSavedUserGoal());
};

export const saveUserGoalFetcher = () => {
  return Client.post(saveUserGoal(), {});
};
