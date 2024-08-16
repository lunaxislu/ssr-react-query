import { testFetchPostAPI } from "@/api/handler";
import { Skeleton } from "@/components/ui/skeleton";
import { TData, TDetailData } from "@/pages/sample/[[...sample]]";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
type TPostData<T extends TData = TData> = T;
const CsrSample2PaginationComponent = dynamic(
  () => import("./Sample2PaginationComponent"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[400px]" />, // Skeleton UI보여주기
  },
);
const Sample2DetailComponent = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const id = router.query.id as string;
  const { data } = useQuery<TPostData>({
    queryKey: ["sample2Post", id],
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

      <CsrSample2PaginationComponent
        id={router.query.id as string}
        queryClient={queryClient}
      />
    </div>
  );
};

export default Sample2DetailComponent;
