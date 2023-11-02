import axios from "axios";
import {
  createAxiosRequestInterceptor,
  createAxiosResponseInterceptor,
} from "@/utils";
import { BASE_URL } from "@/constants";

const instance = axios.create({
  baseURL: `${BASE_URL}`,
  // baseURL: "http://localhost:5000",
  validateStatus: () => true,
});

createAxiosRequestInterceptor(instance);
createAxiosResponseInterceptor(instance);

export default instance;
