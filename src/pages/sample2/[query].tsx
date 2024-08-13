import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Sample2Query = () => {
  const router = useRouter();
  return (
    <div>
      <div> {`${router.asPath} ------> 갤러리 디테일 내용들`}</div>

      <div>다른 갤러리 목록들 보여질 곳</div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/"}
        >
          /sample2/
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/1"}
        >
          /sample2/1
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/2"}
        >
          /sample2/2
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/3"}
        >
          /sample2/3
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/4"}
        >
          /sample2/4
        </Link>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/5"}
        >
          /sample2/5
        </Link>
      </div>
    </div>
  );
};

export default Sample2Query;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log("🚀 ~ getServerSideProps ~ ctx:", ctx.req.url);
  // const data = fetch

  return {
    props: {
      ssr: { "ctx.req.url": ctx.req.url, "ctx.resolvedUrl": ctx.resolvedUrl },
    },
  };
}
