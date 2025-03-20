import { Client } from "../../api.client";

const getReportDetails = (testName: string) =>
  `/report/details?mapped_value=${testName}`;
const getRiskScore = ({ calculatorName }: { calculatorName: string }) =>
  `/risk/get?calculator_name=${calculatorName}`;
const getAddRiskScore = () => `/risk/save`;

export const getReportDetailsFetcher = (testName: string) => {
  return Client.get(getReportDetails(testName));
};
export const getRiskScoreFetcher = ({
  calculatorName,
}: {
  calculatorName: string;
}) => {
  return Client.get(getRiskScore({ calculatorName }));
};
export const getAddRiskScoreFetcher = (payload: any) => {
  return Client.post(getAddRiskScore(), payload);
};
