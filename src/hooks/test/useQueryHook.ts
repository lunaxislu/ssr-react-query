import { useQuery } from "@tanstack/react-query";
import React from "react";
interface IData {
  data: { userId: number; id: number; title: string; body: string }[];
}
const useSetQueryHook = () => {
  return { useQuery };
};

export default useSetQueryHook;
