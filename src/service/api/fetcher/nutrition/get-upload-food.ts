import { Client } from "../../api.client";

const getUserFoodReportUpload = ({
  language,
  portionAmount,
  portionUnit,
}: {
  language: string;
  portionAmount: string;
  portionUnit: string;
}) =>
  `/food/upload/v4?language=${language}&amount=${portionAmount}&portion=${portionUnit}`;
const getUserLatestFoodReportUpload = () => `/food/upload/latest`;
const getUserDefaultFoodReportUpload = () => `/food/upload/default`;
const getUserLoggedMealDataV4 = (date: string) =>
  `/food/logged/v4?date=${date}`;
// const getUserFoodReportByBarCode = ({ bar_code }) =>
//   `/food/barcode/detail?bar_code=${bar_code}`;
const getUserFoodReportByBarCode = ({ bar_code }) =>
  `/food/v2/barcode/detail?bar_code=${bar_code}`;

const getUserFoodReportBarCodeDataByReportId = ({ report_id, language }) =>
  `/food/v2/detail?report_id=${report_id}&language=${language}`;
const getUserFoodReportBarCodeDataByReportIdv4 = ({ report_id, language }) =>
  `/food/v4/detail?report_id=${report_id}&language=${language}`;

const getSaveUserFoodProfileData = (reportId) =>
  `/food/profile?report_id=${reportId}`;
const getFoodTrackerUpload = () => `/food/tracker/upload`;

const getLogFoodDataV4 = ({ es_id, meal_type, type, date }) =>
  `/food/update/v4?es_id=${es_id}&meal_type=${meal_type}&type=${type}&date=${date}`;

const getUserFoodProfileList = () => `/food/list`;
const getUserFoodGraphDetails = () => `/food/tracker/detail`;
const getDeleteUserFoodProfileData = (reportId) =>
  `/food/profile/remove?report_id=${reportId}`;

export const getUserFoodReportUploadFetcher = ({
  PdfFile,
  language,
  portionAmount,
  portionUnit,
}) => {
  return Client.post(
    getUserFoodReportUpload({ language, portionAmount, portionUnit }),
    { PdfFile },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export const getUserFoodReportUploadByBarCodeFetcher = ({ bar_code }) => {
  return Client.post(getUserFoodReportByBarCode({ bar_code }), {});
};
export const getUserFoodReportBarCodeDataByReportIdFetcher = ({
  report_id,
  language,
}) => {
  return Client.get(
    getUserFoodReportBarCodeDataByReportId({ report_id, language })
  );
};
export const getUserFoodReportBarCodeDataByReportIdV4Fetcher = ({
  report_id,
  language,
}) => {
  return Client.get(
    getUserFoodReportBarCodeDataByReportIdv4({ report_id, language })
  );
};
export const getUserLatestFoodReportUploadFetcher = () => {
  return Client.get(getUserLatestFoodReportUpload());
};
export const getUserDefaultFoodReportUploadFetcher = () => {
  return Client.get(getUserDefaultFoodReportUpload());
};
export const getUserLoggedMealDataV4Fetcher = (date: string) => {
  return Client.get(getUserLoggedMealDataV4(date));
};

export const getSaveUserFoodProfileDataFetcher = ({
  reportId,
}: {
  reportId: string;
}) => {
  return Client.post(getSaveUserFoodProfileData(reportId), {});
};
export const getFoodTrackerUploadFetcher = ({
  mealType,
  mealTime,
  reportId,
  timeZone,
  language,
}: {
  mealType: string;
  mealTime: string;
  reportId: string;
  timeZone: string;
  language: string;
}) => {
  return Client.post(getFoodTrackerUpload(), {
    mealType,
    mealTime,
    reportId,
    timeZone,
    language,
  });
};
export const getLogFoodDataV4Fetcher = ({
  meal_type,
  es_id,
  type,
  date,
}: {
  meal_type: string;
  es_id: string;
  type: string;
  date?: string;
}) => {
  return Client.post(
    getLogFoodDataV4({
      meal_type,
      es_id,
      type,
      date,
    }),
    {}
  );
};
export const getDeleteUserFoodProfileDataFetcher = ({
  reportId,
}: {
  reportId: string;
}) => {
  return Client.delete(getDeleteUserFoodProfileData(reportId), {});
};

export const getUserFoodProfileListFetcher = () => {
  return Client.get(getUserFoodProfileList());
};

export const getUserFoodGraphDetailsFetcher = () => {
  return Client.get(getUserFoodGraphDetails());
};
