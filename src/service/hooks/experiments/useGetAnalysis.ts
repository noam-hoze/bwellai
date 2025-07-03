import { getImageAnalysisFetcher } from "@/service/api/fetcher/experiments/get-analysis-results";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useImageAnalysis = () => {
  const {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: getImageAnalysisFetcher,
    onSuccess: (res) => {
      console.log("Experiment image analysis success:", res);
    },
    onError: (err) => {
      console.error("Experiment image analysis error:", err);
    },
  });

  return {
    data: data?.data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
  };
};
