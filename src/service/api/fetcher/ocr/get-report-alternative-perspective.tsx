import { Client } from "../../api.client";

// /perspective?perspective=TRADITIONAL_CHINESE_MEDICINE&category=HUMAN&sub-category=HUMAN&uuid=ZjY2MDM2&language=english&audience=patient

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
