import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

/**
 *
 * @param {InitialData, timeStamp}
 *
 * @explain ClickEvent가 일어나면서 router.replace로 새롭게 데이터를 refetching하는 기법
 * @returns
 */

interface SsrInitialProps {
  initialData: {
    message: string;
  };
  timeStamp: string;
}
const ReplacePage = ({ initialData, timeStamp }: SsrInitialProps) => {
  const router = useRouter();
  const [data, setData] = useState<{ message: string; timeStamp: string }>({
    ...initialData,
    timeStamp,
  });
  console.log(data);
  useEffect(() => {
    // 서버에서 받아온 데이터를 클라이언트에서 다시 설정
    setData({ ...initialData, timeStamp });
  }, [router.asPath, initialData, timeStamp]);

  return (
    <div>
      <h1>ReplacePage</h1>
      <p>Data: {JSON.stringify(data)}</p>
      <p>
        <span style={{ textDecoration: "underline", color: "red" }}>
          {" "}
          Last Updated: {data.timeStamp}{" "}
        </span>
        변경되는 것을 확인 할 수 있다.
      </p>
      <button onClick={() => router.replace("/replace")}>Click Me!!</button>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // 임의의 데이터 생성
  const initialData = { message: "Hello, this is server-side data!" };

  // 서버에서 데이터를 받아오는 시점의 타임스탬프 추가
  const timeStamp = new Date().toLocaleTimeString();

  return {
    props: {
      initialData,
      timeStamp,
    },
  };
};

export default ReplacePage;
