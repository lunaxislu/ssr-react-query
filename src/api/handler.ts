import axios from "axios";

// 서버주소
const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
export const axiosAPI = axios.create({
  baseURL,
});

// 테스트용
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const testFetchAPI = async ({ pageParam = 1 }) => {
  const { data } = await instance.get(`/posts?_page=${pageParam}&_limit=10`); // 쿼리 스트링 쿼리 파라미터
  return data;
};

/**
 * @example
 * 쿼리 스트링은 ?로 시작하며, &로 구분된 key=value 쌍으로 이루어진 추가적인 정보를 URL에 전달하는 방법입니다. 이를 통해 클라이언트가 서버에 요청할 때, 특정한 데이터를 필터링하거나 페이지네이션을 구현하는 등의 기능을 수행할 수 있습니다.
 *
 * @query
 * _page=1&_limit=10 이런 쿼리스트링으로는 특정 데이터들, 데이터 하나를 가져올 수 있는거야?
 *
 * 특정 데이터나, 단일 데이터는 고유 id로 가져온다.
 * 'https://jsonplaceholder.typicode.com/posts?userId=1'
 * 이런 방식으로 특정 userId, status, 또는 다른 필드 값에 따라 데이터를 필터링할 수 있습니다.
 * 이런식으로 쿼리스트링을 사용해서 특정 데이터를 가져올 수 있어.
 */

export const testFetchPostAPI = async (id: number) => {
  try {
    const { data } = await instance.get(`/posts/${id}`); // 특정 id로 데이터 가져오기
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
