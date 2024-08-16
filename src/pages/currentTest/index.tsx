import { testFetchAPI } from "@/api/handler";
import CurrentTestMain from "@/components/currentTest/CurrentTestMain";
import { dehydrate, hydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CurrentTestPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timing = window.performance.timing;

      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      const domContentLoadedTime =
        timing.domContentLoadedEventEnd - timing.navigationStart;

      console.log("SamplePage SSR Load Time:", pageLoadTime);
      console.log("DOM Content Loaded Time:", domContentLoadedTime);
    }
  }, [router.asPath]);
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
