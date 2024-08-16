import { testFetchAPI } from "@/api/handler";
import useCurrentTestFetch from "@/hooks/currentTest/useCurrentTestFetch";
import useSampleFetch from "@/hooks/test/useSampleFetchTest";
import React from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "../ui/skeleton";
import CurrentTestListItem from "./CurrentTestListItem";

const CurrentTestList = () => {
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useCurrentTestFetch({ testFetchAPI, queryKey: ["currentTestPosts"] });
  const { ref, inView } = useInView({
    threshold: 0.1,
    onChange: (inView, entry) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      if (inView) fetchNextPage();
    },
  });

  if (isLoading) return <Skeleton />;
  if (!posts) return <div>데이터가 없습니다.</div>;
  return (
    <>
      <div className="flex flex-wrap justify-start w-[128rem] h-auto gap-[0.8rem] mx-auto">
        {posts.map((post, index) => (
          <CurrentTestListItem post={post} key={index} />
        ))}
      </div>
      {/* 인피니티 스크롤을 위한 div */}
      <div ref={ref} className="h-[50px]"></div>
    </>
  );
};

export default CurrentTestList;
