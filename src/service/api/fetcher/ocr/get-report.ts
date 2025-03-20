import { Client } from "../../api.client";

const getUserReport = (
  id: string,
  perspectives: string,
  reportLanguage: string
) =>
  `/report/info?id=${id}&perspectives=${perspectives}&language=${
    reportLanguage ? reportLanguage : "English"
  }`;

export const getUserReportFetcher = (
  id: string,
  perspectives: string,
  reportLanguage: string
) => {
  return Client.get(getUserReport(id, perspectives, reportLanguage));
};
