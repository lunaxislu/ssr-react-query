import { testFetchPostAPI } from "@/api/handler";
import { Skeleton } from "@/components/ui/skeleton";
import { TData, TDetailData } from "@/pages/sample/[[...sample]]";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Awaitable } from "next-auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
type TPostData<T extends TData = TData> = T;
const CsrSamplePaginationComponent = dynamic(
  () => import("./SamplePaginationComponent"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[400px]" />, // Skeleton UI보여주기
  },
);
const SampleDetailComponent = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const id = router.query.postId as string;
  const { data } = useQuery<TPostData>({
    queryKey: ["samplePost", id],
    queryFn: () => testFetchPostAPI(+id) as Promise<TDetailData>,
    initialData: queryClient.getQueryData<TData>(["sample", id]),
  });

  const [state, setState] = useState(data);
  useEffect(() => {
    setState(data);
  }, [data]);
  return (
    <div>
      <div className="p-10 bg-slate-950 text-zinc-100">
        <h1>상세 내용</h1>
        <div>{state?.id}</div>
        <div>{state?.title}</div>
        <div>{state?.body}</div>
      </div>

      <CsrSamplePaginationComponent
        id={router.query.postId as string}
        queryClient={queryClient}
      />
    </div>
  );
};

export default SampleDetailComponent;
