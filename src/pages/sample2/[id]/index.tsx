import { withCSR } from "@/api/csr-with";
import { testFetchAPI, testFetchPostAPI } from "@/api/handler";
import Sample2DetailComponent from "@/components/sample2/detail/Sample2DetailComponent";
import useSampleFetch from "@/hooks/test/useSampleFetchTest";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";

const Sample2DetailPage = () => {
  return <Sample2DetailComponent />;
};

export default Sample2DetailPage;
export const getServerSideProps = withCSR(
  async (ctx: GetServerSidePropsContext) => {
    if (ctx.params) {
      const queryKey = ctx.params.id;
      console.log("🚀 ~ queryKey:", queryKey);
      const queryClient = new QueryClient();

      await queryClient.prefetchQuery({
        queryKey: ["sample2Post", queryKey],
        queryFn: () => testFetchPostAPI(parseInt(queryKey as string)),
      });
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      };
    }
    return {
      props: {},
      redirect: "/",
    };
  },
);
