import { TestDetailData } from "@/types/test/test";
import { useRouter } from "next/router";
import React from "react";

const CurrentTestListItem = ({ post }: { post: TestDetailData }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/currentTest/detail/${post.id}`);
  };
  return (
    <div
      className="flex flex-col items-center w-[30.2rem] h-[32.5rem] bg-white rounded-lg shadow-md cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold mb-2">{post?.title}</h3>
      <p className="text-gray-500 mb-4">{post?.body}</p>
    </div>
  );
};

export default CurrentTestListItem;
