import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7244/api",
});

export default axiosInstance;