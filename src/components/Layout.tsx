import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";

const NAV_STYLE = {
  display: "flex",
  gap: "20px",
  alignCenter: "center",
  marginBottom: "40px",
};
const LINK_STYLE = {
  padding: "50px",
  backgroundColor: "skyBlue",
  color: "black",
  fontWeight: "bold",
};

const AUTH_STATE_STYLE = {
  padding: "50px",
  backgroundColor: "burlywood",
  color: "black",
  fontWeight: "bold",
};
const Layout = ({ children }: { children: ReactNode }) => {
  const { status, data, update } = useSession();

  return (
    <div>
      <nav style={NAV_STYLE}>
        <Link style={LINK_STYLE} href={"/"}>
          home
        </Link>
        {status !== "authenticated" ? (
          <Link style={LINK_STYLE} href={"/auth"}>
            로그인
          </Link>
        ) : (
          <span style={LINK_STYLE} onClick={() => signOut()}>
            {" "}
            로그아웃
          </span>
        )}
        <Link style={LINK_STYLE} href={"/ssr"}>
          SSR Page
        </Link>
        <Link style={LINK_STYLE} href={"/post"} shallow={true}>
          post
        </Link>
        <Link style={LINK_STYLE} href={"/sample"} shallow={true}>
          sample
        </Link>
        <Link style={LINK_STYLE} href={"/current"}>
          current
        </Link>
        {status !== "authenticated" ? (
          <span style={AUTH_STATE_STYLE}>로그인 전 입니다.</span>
        ) : (
          <span style={AUTH_STATE_STYLE}>로그인 했습니다.</span>
        )}
      </nav>
      {children}
    </div>
  );
};

export default Layout;
