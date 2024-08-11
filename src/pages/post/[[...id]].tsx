import {
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Post = () => {
  const router = useRouter();
  console.log(router.pathname);
  router.push("", undefined, {});
  console.log(router.asPath);
  const [state, setState] = useState(1);
  return (
    <div>
      {router.asPath}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          // shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={{
            pathname: "/post/",
          }}
        >
          /post
        </Link>
        <Link
          // shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/post/1"}
        >
          /post/1
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/post/2"}
        >
          /post/2
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/post/3"}
        >
          /post/3
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/post/4"}
        >
          /post/4
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/post/5"}
        >
          /post/5
        </Link>
      </div>
    </div>
  );
};

export default Post;
export const getStaticPaths = (async () => {
  const paths = [
    { params: { id: ["1"] } }, // <- '1'이 배열로 감싸져 있음
    { params: { id: ["2"] } }, // <- '2'도 배열로 감싸져 있음
    { params: { id: [] } }, // <- 기본 루트(/post) 경로도 처리하려면 빈 배열 사용
  ];

  return {
    paths: [],
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;
export async function getStaticProps(ctx: GetStaticPropsContext) {
  console.log(ctx.params);
  return {
    props: {
      prop: "",
    },
  };
}
