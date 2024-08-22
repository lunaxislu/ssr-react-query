import { fetchChangeSampleDetailAPI } from "@/api/changeToSample1/handler";
import useChangeSampleDetail from "@/hooks/change-current-ToSample1/useChangeSampleDetail";
import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { PostQueryKey } from "@/types/changeToSample/changeToSample";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
const CSRPaginationComponent = dynamic(() => import("./ChangeToPagination"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[400px]" />,
});

const ChangeToDetail = () => {
  const router = useRouter();
  const id = router.query.postId as string;

  console.log("🚀 ~ ChangeToDetail ~ id:", router.asPath);

  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useChangeSampleDetail({
    fetchChangeSampleDetailAPI,
    queryKey: [PostQueryKey.posts],
    id,
  });
  return (
    <div>
      <div className=" flex flex-col items-center justify-center">
        <h1>상세 내용</h1>
        <Carousel className="w-[84.6rem] h-[56rem] mb-8 cursor-pointer">
          <CarouselContent>
            {data?.images?.map((image, index) => (
              <CarouselItem key={image.id}>
                <div className="w-[84.6rem] h-[56rem] flex justify-center items-center rounded-3xl">
                  <Image
                    src={image.image}
                    alt={`Slide ${index + 1}`}
                    objectFit="cover"
                    width={846}
                    height={560}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 w-[4rem] h-[3.7rem]" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[4rem] h-[3.7rem]" />
        </Carousel>
        <div className="mt-4 flex justify-between w-[84.6rem]">
          <h2 className="text-2xl font-bold">{data?.title}</h2>
          <span className="text-gray-500">{data?.updatedAt}</span>
        </div>
        <p className="mt-2 w-[84.6rem]">{data?.content}</p>
        <div className="mt-4 w-[84.6rem] flex space-x-2">
          {data?.postcategory?.map((category) => (
            <span
              key={category.id}
              className="bg-gray-200 px-2 py-1 rounded-full text-sm"
            >
              {category.category}
            </span>
          ))}
        </div>
        <CSRPaginationComponent useQueryClient={queryClient} id={id} />
      </div>
    </div>
  );
};

export default ChangeToDetail;
