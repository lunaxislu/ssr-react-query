import { testFetchPostAPI } from "@/api/handler";
import { Skeleton } from "@/components/ui/skeleton";
import { TData, TDetailData } from "@/pages/sample/[[...sample]]";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Awaitable } from "next-auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
type TPostData<T extends TData = TData> = T;
const SampleDetailComponent = () => {
  const CsrSamplePaginationComponent = dynamic(
    () => import("./SamplePaginationComponent"),
    {
      ssr: false,
      loading: () => <Skeleton className="w-full h-[400px]" />, // Skeleton UI보여주기
    },
  );
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router.query.postId as string;
  const { data } = useQuery<TPostData>({
    queryKey: ["samplePost", id],
    queryFn: () => testFetchPostAPI(+id) as Promise<TDetailData>,
    initialData: queryClient.getQueryData<TData>(["sample", id]),
  });

  return (
    <div>
      <div className="p-10 bg-slate-950 text-zinc-100">
        <h1>상세 내용</h1>
        <div>{data?.id}</div>
        <div>{data?.title}</div>
        <div>{data?.body}</div>
      </div>

      <CsrSamplePaginationComponent
        id={router.query.postId as string}
        queryClient={queryClient}
      />
    </div>
  );
};

export default SampleDetailComponent;
