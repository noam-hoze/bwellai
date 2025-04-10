import { Client } from "../../api.client";

const getAlternativePerspectiveUserReport = (
  perspective: any,
  uuid: string,
  category: string,
  subCategory: string,
  language: string,
  audience: string,
  userId: string
) =>
  `/perspective?perspective=${perspective}&uuid=${uuid}&category=${category}&sub-category=${subCategory}&language=${language}&audience=${audience}${
    userId ? `&userid=${userId}` : ""
  }`;

const getUserReportLatestResultByDate = () => `/report/latest/results`;

export const getAlternativePerspectiveUserReportFetcher = ({
  perspective,
  uuid,
  category,
  subCategory,
  language,
  audience,
  userId,
}) => {
  return Client.post(
    getAlternativePerspectiveUserReport(
      perspective,
      uuid,
      category,
      subCategory,
      language,
      audience,
      userId
    ),
    {}
  );
};

export const getUserReportLatestResultByDateFetcher = ({ testName }) => {
  return Client.post(getUserReportLatestResultByDate(), { testName });
};
