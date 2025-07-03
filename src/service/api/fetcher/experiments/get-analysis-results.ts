import { Client } from "../../api.client";

const getImageAnalysis = () => `/eye/analyze/v4`;

export const getImageAnalysisFetcher = ({ file, type }: { file: File, type: string}) => {
  const formData = new FormData();
  formData.append("image", file); 
  formData.append("type", type);

  return Client.post(getImageAnalysis(), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
