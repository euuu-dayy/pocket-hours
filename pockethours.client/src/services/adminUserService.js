import axiosInstance
from "../api/axios";

const token =
  localStorage.getItem("token");

export const getAllUsers =
  async () => {

  const response =
    await axiosInstance.get(
      "/AdminUsers",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const deleteUser =
  async (id) => {

  const response =
    await axiosInstance.delete(
      `/AdminUsers/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};