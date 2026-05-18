import axiosInstance from "../api/axios";

export const registerUser = async (data) => {
  const response =
    await axiosInstance.post(
      "/Auth/register",
      data
    );

  return response.data;
};

export const loginUser = async (data) => {
  const response =
    await axiosInstance.post(
      "/Auth/login",
      data
    );

  return response.data;
};