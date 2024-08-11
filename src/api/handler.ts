import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
export const axiosAPI = axios.create({
  baseURL,
});
