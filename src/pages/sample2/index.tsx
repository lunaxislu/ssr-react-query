import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
const Sample2Page = ({
  ssr,
}: {
  ssr: {
    "ctx.req.url": string | undefined;
    "ctx.resolvedUrl": string;
  };
}) => {
  const router = useRouter();

  return (
    <div>
      {router.asPath}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          shallow={false}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/1"}
        >
          /sample2/1
        </Link>
        <Link
          shallow={false}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/2"}
        >
          /sample2/2
        </Link>
        <Link
          shallow={false}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/3"}
        >
          /sample2/3
        </Link>
        <Link
          shallow={false}
          style={{ backgroundColor: "white", padding: "20px", color: "black" }}
          href={"/sample2/4"}
        >
          /sample2/4
        </Link>
      </div>
    </div>
  );
};

export default Sample2Page;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log("🚀 ~ getServerSideProps ~ ctx:", ctx.req.url);
  // const data = fetch

  return {
    props: {
      ssr: { "ctx.req.url": ctx.req.url, "ctx.resolvedUrl": ctx.resolvedUrl },
    },
  };
}
