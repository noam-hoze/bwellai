import { Client } from "../../api.client";

const getUserFoodReportUpload = (language: string) =>
  `/food/upload?language=${language}`;
const getUserLatestFoodReportUpload = () => `/food/upload/latest`;
const getUserDefaultFoodReportUpload = () => `/food/upload/default`;
// const getUserFoodReportByBarCode = ({ bar_code }) =>
//   `/food/barcode/detail?bar_code=${bar_code}`;
const getUserFoodReportByBarCode = ({ bar_code }) =>
  `/food/v2/barcode/detail?bar_code=${bar_code}`;

const getUserFoodReportBarCodeDataByReportId = ({ report_id, language }) =>
  `/food/v2/detail?report_id=${report_id}&language=${language}`;

const getSaveUserFoodProfileData = (reportId) =>
  `/food/profile?report_id=${reportId}`;
const getFoodTrackerUpload = () => `/food/tracker/upload`;
const getUserFoodProfileList = () => `/food/list`;
const getUserFoodGraphDetails = () => `/food/tracker/detail`;
const getDeleteUserFoodProfileData = (reportId) =>
  `/food/profile/remove?report_id=${reportId}`;

export const getUserFoodReportUploadFetcher = ({ PdfFile, language }) => {
  return Client.post(
    getUserFoodReportUpload(language),
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
export const getUserLatestFoodReportUploadFetcher = () => {
  return Client.get(getUserLatestFoodReportUpload());
};
export const getUserDefaultFoodReportUploadFetcher = () => {
  return Client.get(getUserDefaultFoodReportUpload());
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
