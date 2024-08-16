import { TestDetailData } from "@/types/test/test";
import React from "react";
import CurrentTestDetailPagination from "./CurrentTestDetailPagination";

const CurrentTestDetail = ({
  data,
  isLoading,
  id,
}: {
  data: TestDetailData | undefined;
  isLoading: boolean;
  id: string;
}) => {
  if (isLoading) return <div>로딩 중입니다!</div>;
  if (!data) return <div>데이터가 없습니다.!</div>;
  return (
    <div className="p-10 bg-slate-950 text-zinc-100">
      <h1>상세 내용</h1>
      <div>{data?.id}</div>
      <div>{data?.title}</div>
      <div>{data?.body}</div>
      <CurrentTestDetailPagination id={id} />
    </div>
  );
};

export default CurrentTestDetail;
