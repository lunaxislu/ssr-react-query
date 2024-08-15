import { testFetchPostAPI } from "@/api/handler";
import { Skeleton } from "@/components/ui/skeleton";
import {
  QueryClient,
  useQueries,
  UseQueryOptions,
} from "@tanstack/react-query";
import Link from "next/link";
import React, { Fragment } from "react";

const SamplePaginationComponent = ({
  id,
  queryClient,
}: {
  id: string;
  queryClient: QueryClient;
}) => {
  const getOtherSamplePostSequence = (id: string) => {
    const n = +id;
    const range = Array.from({ length: 4 }, (_, i) => n + i + 1);
    return range;
  };

  //const url = `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`;
  // 현재 우리가 무한 스크롤 할 때는 posts/all/1?2?3으로 한다.... 백엔드와도 상의를 해야한다.
  const queryKeys = getOtherSamplePostSequence(id);
  const queries: UseQueryOptions<any, unknown, unknown, (string | number)[]>[] =
    queryKeys.map((key) => ({
      queryKey: ["samplePost", `${key}`],
      queryFn: () => testFetchPostAPI(key),
      initialData: queryClient.getQueryData(["samplePost", `${key}`]), // testFetchPostAPI 각 key에 대한 데이터를 가져오는 함수
      //staleTime:
      //gcTime: whatever you want to reflect
      select(data) {
        console.log(data);
        if (!data)
          // 데이터가 없을 때ㅑ
          queryClient.removeQueries({
            queryKey: ["samplePost", `${key}`],
          });
        return data;
      },
      retry: false,
    }));
  const results = useQueries({
    queries,
  });

  return (
    <div className="bg-orange-400">
      <h2 className="mx-auto w-1/2 text-center bg-amber-200 p-12">
        CSR적용 아래 포스팅 페이지네이션은 CSR 방식입니다.
      </h2>
      <div className="flex justify-center gap-[20px] p-11">
        {results.map((query, i) => {
          return (
            <div key={i} className="w-[240px] h-[240px]">
              {query.isLoading ? (
                <Skeleton className="w-[240px] h-[240px]" />
              ) : query.data ? (
                <Link
                  href={{
                    href: `/sample/${query.data.id}`,
                    query: { postId: query.data.id },
                  }}
                  shallow={true}
                  prefetch={false} // hover 할 때만 prefetch
                >
                  <h3>{query.data.title}</h3>
                  <p>{query.data.body}</p>
                  <small>User ID: {query.data.id}</small>
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SamplePaginationComponent;
