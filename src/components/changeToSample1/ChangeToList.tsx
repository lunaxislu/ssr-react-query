import { fetchChangeSampleGalleryAPI } from "@/api/changeToSample1/handler";
import useChangeSampleFetch from "@/hooks/change-current-ToSample1/useChangeSampleFetch";
import React, { Fragment } from "react";
import { useInView } from "react-intersection-observer";
import ChangeToListItem from "./ChangeToListItem";
import { PostQueryKey } from "@/types/changeToSample/changeToSample";

const ChangeToList = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useChangeSampleFetch({
    fetchChangeSampleGalleryAPI: fetchChangeSampleGalleryAPI,
    queryKey: [PostQueryKey.posts],
  });
  const { ref, inView } = useInView({
    threshold: 0.1,
    onChange: (inView, entry) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      if (inView) fetchNextPage();
    },
  });

  return (
    <Fragment>
      <div>
        <ChangeToListItem posts={posts} />
      </div>
      {/* 인피니티 스크롤을 위한 div */}
      <div ref={ref} className="h-[50px]"></div>
    </Fragment>
  );
};

export default ChangeToList;
