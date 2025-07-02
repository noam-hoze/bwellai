import { getEyeAnalysisFetcher } from "@/service/api/fetcher/experiments/get-analysis-results";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useEyeAnalysis = () => {
  const {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: getEyeAnalysisFetcher,
    onSuccess: (res) => {
      console.log("Eye scan success:", res);
    },
    onError: (err) => {
      console.error("Eye scan error:", err);
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
