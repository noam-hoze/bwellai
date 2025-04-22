import { Client } from "../../api.client";

const getUserReportUpload = ({
  // category,
  // subCategory,
  language,
  // personaType,
}) =>
  `/report/v2/upload?language=${language}&category=HUMAN&sub-category=HUMAN&persona-type=patient`;
// const getUserReportUpload = ({
//   category,
//   subCategory,
//   language,
//   personaType,
// }) =>
//   `/report/v2/upload?category=${category}&sub-category=${subCategory}&language=${language}&persona-type=${personaType}`;

const getUserLastReportIDs = ({ page, size }: { page: number; size: number }) =>
  `report/v2/ids?page=${page}&size=${size}`;

export const getUserLastReportIDsFetcher = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  return Client.get(getUserLastReportIDs({ page, size }));
};

export const getUserReportUploadFetcher = ({
  PdfFile,
  // category,
  // subCategory,
  language,
  // personaType,
}) => {
  return Client.post(
    getUserReportUpload({
      // category,
      // subCategory,
      language,
      // personaType,
    }),
    { PdfFile },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const getUserBiomarkerReportData = ({
  language,
  reportId,
  userId,
  perspective,
}) =>
  `report/v2/upload/report?language=${language}&perspective=${
    perspective || "MODERN_MEDICINE"
  }&reportId=${reportId}${userId ? `&userid=${userId}` : ""}`;

export const getUserBiomarkerReportDataFetcher = ({
  prompt,
  language,
  reportId,
  testName,
  userId,
  perspective,
}) => {
  return Client.post(
    getUserBiomarkerReportData({
      language,
      reportId,
      userId,
      perspective,
    }),
    { prompt: JSON.stringify(prompt), testName }
  );
};

const getUserPanelAnalysisReportData = ({ language, perspective, reportId }) =>
  `ocr/panel?language=${language}&perspective=${perspective}&reportId=${reportId}`;

export const getUserPanelAnalysisReportDataFetcher = ({
  reportId,
  panel,
  test,
  language,
  perspective,
}) => {
  return Client.post(
    getUserPanelAnalysisReportData({
      language,
      perspective,
      reportId,
    }),
    { reportId: reportId, panel: panel, test: test }
  );
};
