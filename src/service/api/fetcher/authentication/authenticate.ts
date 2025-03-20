import { Client } from "../../api.client";

const getUserAuthenticate = () => `/user/v1/authenticate`;

const getUserAuthenticateOTP = () => `/user/v1/OTP/validate`;

export const getUserAuthenticateFetcher = (payload) => {
  return Client.post(getUserAuthenticate(), payload);
};

export const getUserAuthenticateOTPFetcher = (payload) => {
  return Client.post(getUserAuthenticateOTP(), payload);
};
