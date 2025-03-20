import { Client } from "../../../api.client";

// const getUserInfo = () => `wearable/v2/user/info/id`;
const getUserInfo = () => `wearable/v3/user/info/id`;
const getDeviceAuthURL = (resource: string) =>
  `wearable/v2/user/authorizers?resource=${resource}`;
const getWearableGraphDataV3 = ({
  startDate,
  endDate,
  resource,
}: {
  startDate: string;
  endDate: string;
  resource: string;
}) =>
  `wearable/v3/data/graphs?resource=${resource}&from=${startDate}&to=${endDate}`;
const getWearableDailyRecommendationDataV4 = ({
  startDate,
  language,
  resource,
}: {
  startDate: string;
  language: string;
  resource: string;
}) =>
  `wearable/v4/daily/insight?resource=${resource}&date=${startDate}&language=${language}`;
const getWearableDailyDataV4 = ({
  startDate,
  resource,
}: {
  startDate: string;
  resource: string;
}) => `wearable/v4/daily?resource=${resource}&date=${startDate}`;
const getWearableWeeklyDataV4 = ({ resource }: { resource: string }) =>
  `wearable/v4/weekly?resource=${resource}`;

const getWearableWeeklyRecommendationDataV4 = ({
  language,
}: {
  language: string;
}) => `wearable/v4/weekly/insight?language=${language}`;

// const getUpdateConnectedDevice = (
//   userId: string,
//   referenceId: string,
//   resource: string
// ) =>
//   `wearable/v2/add-device?resource=${resource}&user-id=${userId}&reference-id=${referenceId}`;
const getUpdateConnectedDevice = (
  userId: string,
  referenceId: string,
  resource: string
) =>
  `wearable/v3/add-device?resource=${resource}&user-id=${userId}&reference-id=${referenceId}`;
const deleteUserWearableDevice = (device: string) =>
  `wearable/v3/delete?device-name=${device}`;
const getWearableElasticSearchData = (device: string) =>
  `wearable/v1/rawdata?resource=${device}&terra_summary=false`;

const getWearableElasticSearchHistoricalData = (
  device: string,
  timeZone: string,
  type: string
) => `wearable/v1/history?resource=${device}&timeZone=${timeZone}&type=${type}`;

const getWearableElasticSearchHistoricalDataV2 = (
  device: string,
  timeZone: string,
  date: string
) => `wearable/v3/data?resource=${device}&timeZone=${timeZone}&date=${date}`;

const getWearableData = (device: string) =>
  `wearable/v1/summary?resource=${device}`;

// const getWearableDataV2 = (
//   device: string,
//   timeZone: string,
//   type: string,
//   subtype: string,
//   date: string
// ) =>
//   `wearable/v2/report?resource=${device}&timeZone=${timeZone}&type=${type}&subtype=${subtype}&date=${date}`;
const getWearableDataV3 = (
  device: string,
  timeZone: string,
  type: string,
  subtype: string,
  date: string,
  language: string
) =>
  `wearable/v3/report?resource=${device}&timeZone=${timeZone}&type=${type}&sub_type=${subtype}&date=${date}&language=${language}`;

export const getUserInfoFetcher = () => {
  return Client.get(getUserInfo());
};

export const getDeviceAuthURLFetcher = ({ resource, redirect_url }) => {
  return Client.post(getDeviceAuthURL(resource), {
    auth_success_redirect_url: redirect_url,
    auth_failure_redirect_url: redirect_url,
  });
};
export const getUpdateConnectedDeviceFetcher = ({
  userId,
  referenceId,
  resource,
}) => {
  return Client.post(
    getUpdateConnectedDevice(userId, referenceId, resource),
    {}
  );
};
export const getWearableElasticSearchHistoricalDataFetcherV2 = ({
  device,
  timeZone,
  date,
}) => {
  return Client.get(
    getWearableElasticSearchHistoricalDataV2(device, timeZone, date)
  );
};
export const getWearableGraphDataV3Fetcher = ({
  resource,
  startDate,
  endDate,
}) => {
  return Client.get(getWearableGraphDataV3({ resource, startDate, endDate }));
};

export const getDeleteUserWearableDeviceFetcher = ({ device }) => {
  return Client.delete(deleteUserWearableDevice(device), {});
};

export const getWearableDataFetcherV2 = ({
  device,
  timeZone,
  type,
  subtype,
  date,
  language,
}) => {
  return Client.post(
    getWearableDataV3(device, timeZone, type, subtype, date, language),
    {}
  );
};
export const getWearableDataFetcher = (device: string) => {
  return Client.get(getWearableData(device));
};

export const getWearableElasticSearchDataFetcher = (device: string) => {
  return Client.get(getWearableElasticSearchData(device));
};

export const getWearableElasticSearchHistoricalDataFetcher = (
  device: string,
  timeZone: string,
  type: string
) => {
  return Client.get(
    getWearableElasticSearchHistoricalData(device, timeZone, type)
  );
};
export const getWearableDailyRecommendationDataV4Fetcher = (
  resource: string,
  startDate: string,
  language: string
) => {
  return Client.get(
    getWearableDailyRecommendationDataV4({ resource, startDate, language })
  );
};
export const getWearableDailyDataV4Fetcher = (
  resource: string,
  startDate: string
) => {
  return Client.get(getWearableDailyDataV4({ resource, startDate }));
};
export const getWearableWeeklyDataV4Fetcher = (resource: string) => {
  return Client.get(getWearableWeeklyDataV4({ resource }));
};
export const getWearableWeeklyRecommendationDataV4Fetcher = (
  language: string
) => {
  return Client.get(getWearableWeeklyRecommendationDataV4({ language }));
};
