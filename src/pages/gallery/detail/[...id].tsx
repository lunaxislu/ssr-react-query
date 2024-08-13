import { GetStaticPaths, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const GalleryDetail = () => {
  const router = useRouter();
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

export default GalleryDetail;
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
  console.log(ctx);
  console.log("🚀 ~ galleryDetail ~ ctx:", ctx.params);

  return {
    props: {
      prop: "",
    },
  };
}
