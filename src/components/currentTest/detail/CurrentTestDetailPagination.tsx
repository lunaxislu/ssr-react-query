import { testFetchPostAPI } from "@/api/handler";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueries, UseQueryOptions } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

const CurrentTestDetailPagination = ({ id }: { id: string }) => {
  const getOtherSamplePostSequence = (id: string) => {
    const n = +id;
    const range = Array.from({ length: 4 }, (_, i) => n + i + 1);
    return range;
  };
  const router = useRouter();
  const navigateHandler = (id: string) =>
    router.push(`/currentTest/detail/${id}`);
  const queryKeys = getOtherSamplePostSequence(id);
  const queries: UseQueryOptions<any, unknown, unknown, (string | number)[]>[] =
    queryKeys.map((key) => ({
      queryKey: ["currentTestPost", `${key}`],
      queryFn: () => testFetchPostAPI(key),
      retry: false,
    }));
  const results = useQueries({
    queries,
  });
  return (
    <div>
      <div className="flex justify-center gap-[20px] p-11">
        {results.map((query, i) => {
          return (
            <div key={i} className="w-[240px] h-[240px]">
              {query.isLoading ? (
                <Skeleton className="w-[240px] h-[240px]" />
              ) : query.data ? (
                <div
                  onClick={() => navigateHandler(query.data.id)}
                  className="border-r-rose-700"
                >
                  <h3>{query.data.title}</h3>
                  <p>{query.data.body}</p>
                  <small>User ID: {query.data.id}</small>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentTestDetailPagination;
