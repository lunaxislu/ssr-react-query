import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
const SamplePage = ({
  ssr,
}: {
  ssr: {
    "ctx.req.url": string | undefined;
    "ctx.resolvedUrl": string;
  };
}) => {
  console.log(ssr);
  const router = useRouter();

  return (
    <div>
      {router.asPath}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          shallow={false}
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
      </div>
    </div>
  );
};

export default SamplePage;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  console.log("🚀 ~ getServerSideProps ~ ctx:", ctx);
  // const data = fetch

  return {
    props: {
      ssr: { "ctx.req.url": ctx.req.url, "ctx.resolvedUrl": ctx.resolvedUrl },
    },
  };
}
