import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEvent, useState } from "react";
import { useInView } from "react-intersection-observer";
import useFetchTest from "@/hooks/test/useFetchTest";
import { testFetchAPI } from "@/api/handler";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const Post = (props: { post: { title: string; content: string } }) => {
  const router = useRouter();
  const [state, setState] = useState(1);
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
  } = useFetchTest({ testFetchAPI });
  const { ref, inView } = useInView({
    threshold: 0.1,
    onChange: (inView, entry) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      if (inView) fetchNextPage();
    },
  });
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const post = e.target as HTMLDivElement;
    const parent = post.closest("div");
    if (parent && parent.dataset.id) {
      router.push(`/post/${parent.dataset.id}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!posts) return <div>No posts</div>;
  return (
    <div style={{ height: "100vh" }}>
      <div className="flex flex-wrap gap-[0.8rem]" onClick={handleClick}>
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              data-id={post.id}
              className="h-[300px] w-[400px] p-[1rem] bg-red-500 flex items-center justify-center flex-col"
            >
              <div>{post.id}</div>
              <div>{post.title}</div>
              <div>{post.body}</div>
            </div>
          );
        })}
      </div>
      {/* 인피니티 스크롤을 위한 div */}
      <div ref={ref} className="h-[50px] bg-blue-500"></div>
    </div>
  );
};

export default Post;
// export const getServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   console.log(ctx.req.url?.includes("/_next/"));
//   const { params } = ctx;

//   if (ctx.req.url?.includes("/_next/data/development/post.json")) return {};
//   return {
//     props: {
//       post: {
//         title: "title",
//         content: "content",
//       },
//     },
//   };
// };
// export const getStaticPaths = (async () => {
//   const paths = [
//     { params: { id: ["1"] } }, // <- '1'이 배열로 감싸져 있음
//     { params: { id: ["2"] } }, // <- '2'도 배열로 감싸져 있음
//     { params: { id: [] } }, // <- 기본 루트(/post) 경로도 처리하려면 빈 배열 사용
//   ];

//   return {
//     paths: [],
//     fallback: true, // false or "blocking"
//   };
// }) satisfies GetStaticPaths;
// export async function getStaticProps(ctx: GetStaticPropsContext) {
//   // console.log(ctx.params);
//   return {
//     props: {
//       prop: "",
//     },
//   };
// }
