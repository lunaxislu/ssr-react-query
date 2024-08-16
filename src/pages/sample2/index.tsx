import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { withCSR } from "@/api/csr-with";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { testFetchAPI, testFetchPostAPI } from "@/api/handler";
import ScrollSample2Component from "@/components/sample2/ScrollSample2Component";
const Sample2Page = () => {
  return (
    <div>
      <ScrollSample2Component />
    </div>
  );
};

export default Sample2Page;
export const getServerSideProps = withCSR(
  async (ctx: GetServerSidePropsContext) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
      queryKey: ["sample2Post"],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => testFetchAPI({ pageParam }),
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
);
