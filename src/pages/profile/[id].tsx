import { GetStaticPaths, GetStaticPropsContext } from "next";
import React from "react";

const ProfilePage = () => {
  return (
    <div>
      profile // 보는 것은 많으나, 잘 안바뀌는 것들
      <div>
        여기는 csr로 내려줄 컴포넌트, // 동적으로 바뀌는 것들 , 예를 들어 자신이
        쓴 갤러리들
      </div>
    </div>
  );
};

export default ProfilePage;

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking", // false or "blocking"
  };
}) satisfies GetStaticPaths;
export async function getStaticProps(ctx: GetStaticPropsContext) {
  // console.log(ctx.params);

  const USER_Profile = fetch("http://localhost:4000/users/mypage", {
    method: "post",
    headers: {},
    next: {
      revalidate: 60,
    },
  });
  return {
    props: {
      prop: "",
    },
  };
}
