import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import React from "react";

const SSR = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["ssr"],
    queryFn: () => axios("https://jsonplaceholder.typicode.com/posts?id=1"),
    select(data) {
      return data.data;
    },
  });
  console.log(isLoading, isFetching);
  console.log(data);

  return <div>{/* <div onClick={() => mutate()}>add</div> */}</div>;
};

export default SSR;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // const data = fetch
  // ctx.res.setHeader(
  //   "Cache-Control",
  //   "public, s-maxage=10, stale-while-revalidate=59",
  // );
  return {
    props: { ssr: "" },
  };
}
