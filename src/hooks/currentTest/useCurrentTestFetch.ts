import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
interface IProps {
  queryKey: string[];
  testFetchAPI: ({ pageParam }: { pageParam: number }) => Promise<any>;
}

interface IQueryData {
  pageParams: number[];
  pages: { userId: number; id: number; title: string; body: string }[][];
}
const useCurrentTestFetch = (props: IProps) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: props.queryKey,
    queryFn: ({ pageParam }) => props.testFetchAPI({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    select: (data: IQueryData) => {
      return data.pages.map((pageData) => pageData).flat();
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};

export default useCurrentTestFetch;
