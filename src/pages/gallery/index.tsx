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

  const [state, setState] = useState(1);
  return (
    <div>
      {router.asPath}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={{
            pathname: "/gallery",
          }}
        >
          /gallery
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/gallery/detail/1"}
        >
          /gallery/detail/1
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/gallery/detail/2"}
        >
          /gallery/detail/2
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/gallery/detail/3"}
        >
          /gallery/detail/3
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/gallery/detail/4"}
        >
          /gallery/detail/4
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/gallery/detail/5"}
        >
          /gallery/detail/5
        </Link>
      </div>
    </div>
  );
};

export default Post;

export async function getStaticProps(ctx: GetStaticPropsContext) {
  console.log("🚀 ~ galleryDetail ~ ctx:", ctx);
  return {
    props: {
      prop: "",
    },
  };
}
