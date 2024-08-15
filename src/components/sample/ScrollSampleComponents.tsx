import { testFetchAPI } from "@/api/handler";
import useFetchTest from "@/hooks/test/useFetchTest";
import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";

const ScrollSampleComponents = () => {
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
  } = useFetchTest({ testFetchAPI, queryKey: ["samplePost"] });
  const { ref, inView } = useInView({
    threshold: 0.1,
    onChange: (inView, entry) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      if (inView) fetchNextPage();
    },
  });
  return (
    <div style={{ height: "100vh" }}>
      <div className="flex flex-wrap gap-[0.8rem]">
        {posts?.map((post) => {
          return (
            <Link
              href={{
                href: `/sample/${post.id}`,
                query: { postId: post.id },
              }}
              shallow={true}
              key={post.id}
              className="h-[300px] w-[400px] p-[1rem] bg-red-500 flex items-center justify-center flex-col"
            >
              <div>{post.id}</div>
              <div>{post.title}</div>
              <div>{post.body}</div>
            </Link>
          );
        })}
      </div>
      {/* 인피니티 스크롤을 위한 div */}
      <div ref={ref} className="h-[50px] bg-blue-500"></div>
    </div>
  );
};

export default ScrollSampleComponents;
