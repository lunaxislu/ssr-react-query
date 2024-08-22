import { Post } from "@/types/changeToSample/changeToSample";
import {
  QueryClient,
  useQueries,
  UseQueryOptions,
} from "@tanstack/react-query";

interface PostDetailPaginationProps {
  fetchChangeSampleDetailAPI: (id: string) => Promise<Post>;
  id: string;
  queryKey: string[];
  useQueryClient: QueryClient;
}
const useQueriesPagination = (props: PostDetailPaginationProps) => {
  const { id, fetchChangeSampleDetailAPI, queryKey, useQueryClient } = props;
  const getOtherSamplePostSequence = (id: string) => {
    const n = +id;
    const range = Array.from({ length: 4 }, (_, i) => n + i + 1);
    return range;
  };

  const queryKeys = getOtherSamplePostSequence(id);
  const queries: UseQueryOptions<
    Post,
    unknown,
    unknown,
    (string | number)[]
  >[] = queryKeys.map((key) => {
    console.log(key);
    return {
      queryKey: [...queryKey, `${key}`],
      queryFn: () => fetchChangeSampleDetailAPI(`${key}`),
      retry: false,
      //gcTime: whatever you want to reflect
      select(data) {
        if (!data)
          // 데이터가 없을 때 queryKey 삭제
          useQueryClient.removeQueries({
            queryKey: [...queryKey, `${key}`],
          });
        return data;
      },
    };
  });
  const results = useQueries({
    queries,
  });

  return {
    results,
  };
};

export default useQueriesPagination;
