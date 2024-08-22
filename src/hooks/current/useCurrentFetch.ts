import { testCurrentFetchAPI } from "@/api/current/handler";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFetchCurrentQuery = () => {
  /**
   * 무한스클롤 용 react-query
   */
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["galleryUpload"],
    queryFn: ({ pageParam }) => testCurrentFetchAPI({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    select: (data) => {
      return data.pages.map((pageData) => pageData).flat();
    },
  });

  return {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  };
};

export default useFetchCurrentQuery;
