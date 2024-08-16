import { testFetchPostAPI } from "@/api/handler";
import { TestDetailData } from "@/types/test/test";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useCurrentTestDetailFetch = (id: string) => {
  const { data, isLoading, refetch, isError, error } = useQuery<TestDetailData>(
    {
      queryKey: ["currentTestPosts", id],
      queryFn: () => testFetchPostAPI(+id),
    },
  );
  return { data, isLoading, refetch, isError, error };
};

export default useCurrentTestDetailFetch;
