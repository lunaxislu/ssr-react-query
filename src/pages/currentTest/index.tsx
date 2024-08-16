import { testFetchAPI } from "@/api/handler";
import CurrentTestMain from "@/components/currentTest/CurrentTestMain";
import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";

import React from "react";

const CurrentTestPage = () => {
  return (
    <div>
      <CurrentTestMain />
    </div>
  );
};

export default CurrentTestPage;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["currentTestPosts"],
    queryFn: ({ pageParam }) => testFetchAPI({ pageParam }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
