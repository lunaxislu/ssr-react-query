import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SampleDetail = ({
  ssr,
}: {
  ssr: {
    "ctx.req.url": string | undefined;
    "ctx.resolvedUrl": string;
  };
}) => {
  const router = useRouter();
  console.log(ssr, "<---- sampleDetail");
  return (
    <div>
      <div> {`${router.asPath} ------> 갤러리 디테일 내용들`}</div>

      <div>다른 갤러리 목록들 보여질 곳</div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          shallow={true}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample/1"}
        >
          /sample/1
        </Link>
        <Link
          shallow={false}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample/2"}
        >
          /sample/2
        </Link>
        <Link
          shallow={false}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample/3"}
        >
          /sample/3
        </Link>
        <Link
          shallow={false}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample/4"}
        >
          /sample/4
        </Link>
        <Link
          shallow={false}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample/5"}
        >
          /sample/5
        </Link>
      </div>
    </div>
  );
};

export default SampleDetail;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log("🚀 ~ getServerSideProps ~ ctx:", ctx);
  // const data = fetch

  return {
    props: {
      ssr: { "ctx.req.url": ctx.req.url, "ctx.resolvedUrl": ctx.resolvedUrl },
    },
  };
}
