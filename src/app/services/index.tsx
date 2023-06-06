import axios from "axios";
import { io } from "socket.io-client";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export const socket = io(process.env.NEXT_PUBLIC_API_URL || "");
