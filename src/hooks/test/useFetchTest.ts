import {
  QueryCache,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect } from "react";
import useSetQueryHook from "./useQueryHook";
interface IProps {
  queryKey: string[];
  testFetchAPI: ({ pageParam }: { pageParam: number }) => Promise<any>;
}
new QueryCache({});
interface IQueryData {
  pageParams: number[];
  pages: { userId: number; id: number; title: string; body: string }[][];
}
const useFetchTest = (props: IProps) => {
  const client = useQueryClient();

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
      const res = data.pages.map((pageData) => pageData).flat();

      res.forEach((data) => {
        const queryKey = [...props.queryKey, `${data.id}`];
        client.setQueryData(queryKey, data);
      });

      return res;
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

export default useFetchTest;
