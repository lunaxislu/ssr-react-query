import CurrentTestDetail from "@/components/currentTest/detail/CurrentTestDetail";
import useCurrentTestDetailFetch from "@/hooks/currentTest/useCurrentTestDetailFetch";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";

const CurrentTestDetailPage = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    refetch: fetchGalleries,
  } = useCurrentTestDetailFetch(id);
  return <CurrentTestDetail data={data} isLoading={isLoading} id={id} />;
};

export default CurrentTestDetailPage;
export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { id } = query;
  return { props: { id } };
};
