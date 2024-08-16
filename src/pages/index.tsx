import Image from "next/image";
import { Inter } from "next/font/google";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    ></main>
  );
}
