import {
  fetchChangeSampleDetailAPI,
  fetchChangeSampleGalleryAPI,
} from "@/api/changeToSample1/handler";
import { withCSR } from "@/api/csr-with";
import ChangeToList from "@/components/changeToSample1/ChangeToList";
import ChangeToDetail from "@/components/changeToSample1/detail/ChangeToDetail";
import { PostQueryKey } from "@/types/changeToSample/changeToSample";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";

const BASE_PATH = "/change-current-ToSample1";
const ChangeToSamplePage = () => {
  const router = useRouter();

  return (
    <div>
      {router.asPath === BASE_PATH ? <ChangeToList /> : <ChangeToDetail />}
      router의 path : {router.asPath}
    </div>
  );
};

export default ChangeToSamplePage;

export const getServerSideProps = withCSR(
  async (ctx: GetServerSidePropsContext) => {
    const queryKey = ctx.query.postId;
    const queryClient = new QueryClient();

    if (queryKey) {
      await queryClient.prefetchQuery({
        queryKey: [PostQueryKey.posts, queryKey],
        queryFn: () => fetchChangeSampleDetailAPI(queryKey as string),
      });
    }

    if (queryKey) {
      await queryClient.prefetchInfiniteQuery({
        queryKey: [PostQueryKey.posts],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => fetchChangeSampleGalleryAPI({ pageParam }),
      });
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
);
