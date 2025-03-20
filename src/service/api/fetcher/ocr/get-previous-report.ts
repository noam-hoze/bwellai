import { Client } from "../../api.client";

const getUserPreviousReport = (
  perspectives: string,
  previousReportId: string,
  reportLanguage: string
) =>
  `/report/info/latest?perspectives=${perspectives}${
    previousReportId ? `&reportId=${previousReportId}` : ""
  }${`&language=${reportLanguage || "English"}`}`;

export const getUserPreviousReportFetcher = (
  perspectives: string,
  previousReportId: string,
  reportLanguage: string
) => {
  return Client.get(
    getUserPreviousReport(perspectives, previousReportId, reportLanguage)
  );
};
