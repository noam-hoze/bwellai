import { Client } from "../../api.client";

const getEyeAnalysis = () => `/eye/analyze/v4`;

export const getEyeAnalysisFetcher = ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("image", file); 

  return Client.post(getEyeAnalysis(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
