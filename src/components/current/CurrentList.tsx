import useFetchCurrentQuery from "@/hooks/current/useCurrentFetch";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import CurrentListItem from "./CurrentListItem";
import { I_CurrentItemData } from "@/types/current/current";
import { Skeleton } from "../ui/skeleton";

const CurrentList = () => {
  const {
    data: galleries,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchCurrentQuery();

  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });
  if (isLoading) return <Skeleton />;
  if (!galleries) return <div>데이터가 없습니다.</div>;
  return (
    <>
      <div className="flex flex-wrap justify-start w-[128rem] h-auto gap-[0.8rem] mx-auto">
        {galleries.map((gallery: I_CurrentItemData, index) => (
          <CurrentListItem gallery={gallery} key={index} />
        ))}
      </div>
      {/* 인피니티 스크롤을 위한 div */}
      <div ref={ref} className="h-[50px]"></div>
    </>
  );
};

export default CurrentList;
