import axiosInstance
from "../api/axios";

export const getProfile =
  async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await axiosInstance.get(
      "/Users/profile",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};