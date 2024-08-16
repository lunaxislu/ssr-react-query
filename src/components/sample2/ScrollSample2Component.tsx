import useSampleFetch from "@/hooks/test/useSampleFetchTest";
import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";
import { testFetchAPI } from "@/api/handler";
const ScrollSample2Component = () => {
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
  } = useSampleFetch({ testFetchAPI, queryKey: ["sample2Post"] });
  const { ref, inView } = useInView({
    threshold: 0.1,
    onChange: (inView, entry) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      if (inView) fetchNextPage();
    },
  });
  return (
    <div style={{ height: "100vh" }}>
      <div className="flex flex-wrap justify-start w-[128rem] h-auto gap-[0.8rem] mx-auto">
        {posts?.map((post) => {
          return (
            <Link
              href={`/sample2/${post.id}/`}
              shallow={true}
              key={post.id}
              className="flex flex-col items-center w-[30.2rem] h-[32.5rem] bg-white rounded-lg shadow-md cursor-pointer overflow-hidden"
            >
              <h3 className="text-xl font-bold mb-2">{post?.title}</h3>
              <p className="text-gray-500 mb-4">{post?.body}</p>
            </Link>
          );
        })}
      </div>
      {/* 인피니티 스크롤을 위한 div */}
      <div ref={ref} className="h-[50px] bg-blue-500"></div>
    </div>
  );
};

export default ScrollSample2Component;
