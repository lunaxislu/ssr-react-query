import { fetchChangeSampleDetailAPI } from "@/api/changeToSample1/handler";
import { Skeleton } from "@/components/ui/skeleton";
import useQueriesPagination from "@/hooks/change-current-ToSample1/useQueriesPagination";
import { Post, PostQueryKey } from "@/types/changeToSample/changeToSample";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
interface PostDetailPaginationProps {
  id: string;
  useQueryClient: QueryClient;
}
const ChangeToPagination = (props: PostDetailPaginationProps) => {
  const { id, useQueryClient } = props;
  const { results } = useQueriesPagination({
    fetchChangeSampleDetailAPI,
    id,
    useQueryClient,
    queryKey: [PostQueryKey.posts],
  });
  return (
    <div className="bg-orange-400">
      <h2 className="mx-auto w-1/2 text-center bg-amber-200 p-12">
        CSR적용 아래 포스팅 페이지네이션은 CSR 방식입니다.
      </h2>
      <div className="flex justify-center gap-[20px] p-11">
        {results.map((query, i) => {
          return (
            <div
              key={`${query.data?.createdAt}${id}${i}`}
              className="w-[240px] h-[240px]"
            >
              {query.isLoading ? (
                <Skeleton className="w-[240px] h-[240px]" />
              ) : query.data ? (
                <Link
                  href={{
                    href: `/change-current-ToSample1/${query.data.id}`,
                    query: { postId: query.data.id },
                  }}
                  shallow={true}
                  prefetch={false}
                  className="flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer overflow-hidden"
                  key={query.data.id}
                >
                  <span className=" w-[100%] h-[10rem] object-cover mb-6 relative">
                    <Image
                      layout="fill"
                      src={query.data.thumbnail ?? ""}
                      alt={query.data.title}
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </span>
                  <h3 className="text-xl font-bold mb-2">
                    {query.data?.title}
                  </h3>
                  <h3 className="text-xl font-bold mb-2">{query.data?.id}</h3>
                  <p className="text-gray-500 mb-4">{query.data?.content}</p>
                  <div className="flex space-x-2">
                    {query.data.postcategory.map((category) => (
                      <span
                        key={`${category.id}${id}`}
                        className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                      >
                        {category.category}
                      </span>
                    ))}
                  </div>
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChangeToPagination;
