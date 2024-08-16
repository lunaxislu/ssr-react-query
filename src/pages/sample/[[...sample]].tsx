import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { withCSR } from "@/api/csr-with";
import { ParsedUrl } from "next/dist/shared/lib/router/utils/parse-url";
import ScrollSampleComponents from "@/components/sample/ScrollSampleComponents";
import SampleDetailComponent from "@/components/sample/detail/SampleDetailComponent";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { testFetchAPI, testFetchPostAPI } from "@/api/handler";

export interface TData {
  userId: string;
  id: string;
  title: string;
  body: string;
}
export interface TDetailData {
  userId: string;
  id: string;
  title: string;
  body: string;
  category: string[];
  comments: string[];
}
const BASE_PATH = "/sample";
const SamplePage = () => {
  const router = useRouter();
  return (
    <div>
      {router.asPath === BASE_PATH ? (
        <ScrollSampleComponents />
      ) : (
        <SampleDetailComponent />
      )}
      router의 path : {router.asPath}
    </div>
  );
};

export default SamplePage;

// Case 1
//   //  /sample ---->  ctx.params {}
//   // /sample/:* ----> ctx.params { sample: ['1']}
//   const {sample} = ctx.params as ParsedUrl

// Case 2
//  /sample ----> ctx.req.url -----> /sample
// /sample/1 -----> ctx.req.url------> /sample/1
// Case 2번으로 한다면 상수로 두기
// const BASE_PATH = "/sample";

// Case 3
// 아니면, Layout의 Link ---> /sample이 아니라 /sample/main으로 두면 어떨까?

// Case 1과 2,3번 중 무엇으로 조건부 처리하면 좋을지 생각해보기

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const queryKey = ctx.query.postId; // query를 가지기 위해 각 Link 컴포넌트에 query를 넣어 줬습니다. query: { postId: query.data.id },
  if (queryKey) {
    console.log(queryKey, "query가 있으면 여기 로직");
    await queryClient.prefetchQuery({
      queryKey: ["samplePost", queryKey],
      queryFn: () => testFetchPostAPI(+queryKey),
    });
  } else {
    console.log(
      queryKey,
      "query가 없으면 여기 로직 : -> 즉 /sample이라는 url이며, useInfinityQuery 실행하는 로직 ",
    );

    await queryClient.prefetchInfiniteQuery({
      queryKey: ["samplePost"],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => testFetchAPI({ pageParam }),
    });
  }
  return {
    props: {
      dehydrateState: dehydrate(queryClient),
    },
  };
}

// export const getServerSideProps = withCSR(
//   async (ctx: GetServerSidePropsContext) => {

//   },
// );
