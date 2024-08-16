import { testFetchPostAPI } from "@/api/handler";
import CurrentTestDetail from "@/components/currentTest/detail/CurrentTestDetail";
import useCurrentTestDetailFetch from "@/hooks/currentTest/useCurrentTestDetailFetch";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CurrentTestDetailPage = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    refetch: fetchGalleries,
  } = useCurrentTestDetailFetch(id);
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
  return <CurrentTestDetail data={data} isLoading={isLoading} id={id} />;
};

export default CurrentTestDetailPage;
export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { id } = query;

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["currentTestPosts", id],
    queryFn: () => testFetchPostAPI(parseInt(id as string)),
  });
  return { props: { dehydrateState: dehydrate(queryClient), id: id } };
};
