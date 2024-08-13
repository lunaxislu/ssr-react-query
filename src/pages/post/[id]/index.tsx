import CsrComponent from "@/components/post/CsrComponent";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
interface IQueryData {
  pageParams: number[];
  pages: { userId: number; id: number; title: string; body: string }[][];
}
type TData = {
  param?: string;
  userId: number;
  id: number;
  title: string;
  body: string;
};
const PostDetail = (props: { post: TData }) => {
  const router = useRouter();
  //console.log(router.query); 이거 사용해야 함
  const queryClient = useQueryClient();
  const { data: testData } = useQuery<TData>({
    queryKey: ["test" + router.query.id],
    queryFn: async () => {
      const result = await axios.get<TData>(
        `https://jsonplaceholder.typicode.com/posts?userId=${1}&id=${
          router.query.id
        }`,
      );

      return result.data;
    },

    // initialData: () => {
    //   const initial = queryClient.getQueryData<TData>([
    //     "test" + router.query.id,
    //   ]);
    //   console.log("initialData--------->", initial);
    //   return initial;
    // },
  });

  const [state, setState] = useState<TData | undefined>(testData);
  console.log(testData, "-----------------", props.post);

  return (
    <div>
      <div>{state?.id}</div>
      <div>{state?.title}</div>
      <div>{state?.body}</div>
      <CsrComponent />
    </div>
  );
};

export default PostDetail;
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context;

  const { id } = params as { id: string };

  const isCsr = context.req.url?.includes("/_next/");
  if (!isCsr) {
    const queryClient = new QueryClient();
    await queryClient.fetchQuery({
      queryKey: ["test" + id],
      queryFn: async () => {
        const { data } = await axios.get<TData[]>(
          `https://jsonplaceholder.typicode.com/posts?id=${id}`,
        );
        return data[0];
      },
    });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
  return {
    props: {
      post: {},
    },
  };
};
{
  /* <div style={{ display: "flex", gap: "20px" }}>
<Link
  shallow={true}
  style={{ backgroundColor: "white", padding: "20px", color: "black" }}
  href={{
    pathname: "/post/",
  }}
>
  /post
</Link>
<Link
  shallow={true}
  style={{ backgroundColor: "white", padding: "20px", color: "black" }}
  href={"/post/1"}
>
  /post/1
</Link>
<Link
  shallow={true}
  style={{ backgroundColor: "white", padding: "20px", color: "black" }}
  href={"/post/2"}
>
  /post/2
</Link>
<Link
  shallow={true}
  style={{ backgroundColor: "white", padding: "20px", color: "black" }}
  href={"/post/3"}
>
  /post/3
</Link>
<Link
  shallow={true}
  style={{ backgroundColor: "white", padding: "20px", color: "black" }}
  href={"/post/4"}
>
  /post/4
</Link>
<Link
  shallow={true}
  style={{ backgroundColor: "white", padding: "20px", color: "black" }}
  href={"/post/5"}
>
  /post/5
</Link>
</div> */
}
