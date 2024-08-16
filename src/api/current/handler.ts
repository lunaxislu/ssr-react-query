// 테스트용

import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const testCurrentFetchAPI = async ({ pageParam = 1 }) => {
  const { data } = await instance.get(`/posts?_page=${pageParam}&_limit=10`); // 쿼리 스트링 쿼리 파라미터
  return data;
};
