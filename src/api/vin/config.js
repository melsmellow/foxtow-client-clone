import axios from "axios";
import {
  createAxiosRequestInterceptor,
  createAxiosResponseInterceptor,
} from "@/utils";
import { VIN_BASE_URL } from "@/constants";

const instance = axios.create({
  baseURL: `${VIN_BASE_URL}`,
  validateStatus: () => true,
});

createAxiosRequestInterceptor(instance);
createAxiosResponseInterceptor(instance);

export default instance;
