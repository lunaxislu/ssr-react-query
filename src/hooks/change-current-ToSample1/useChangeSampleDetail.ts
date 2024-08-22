import { Post } from "@/types/changeToSample/changeToSample";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
type TPostData<T extends Post = Post> = T;

interface PostDetailProps {
  fetchChangeSampleDetailAPI: (id: string) => Promise<TPostData>;
  id: string;
  queryKey: string[];
}
const useChangeSampleDetail = (props: PostDetailProps) => {
  const queryClient = useQueryClient();
  const { queryKey, id, fetchChangeSampleDetailAPI } = props;
  const { data, isLoading, isError } = useQuery<TPostData>({
    queryKey: [...queryKey, id],
    queryFn: () => fetchChangeSampleDetailAPI(id),
    initialData: queryClient.getQueryData<TPostData>([...queryKey, id]),
  });
  return {
    data,
    isLoading,
    isError,
  };
};

export default useChangeSampleDetail;
