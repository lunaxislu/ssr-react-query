import { withCSR } from "@/api/csr-with";
import { testFetchPostAPI } from "@/api/handler";
import Sample2DetailComponent from "@/components/sample2/detail/Sample2DetailComponent";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";

import React from "react";

const Sample2DetailPage = () => {
  return <Sample2DetailComponent />;
};

export default Sample2DetailPage;
export const getServerSideProps = withCSR(
  async (ctx: GetServerSidePropsContext) => {
    if (ctx.params) {
      const queryKey = ctx.params.id;
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
