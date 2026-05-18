import axiosInstance
from "../api/axios";

export const getAllJobs =
  async (
    pageNumber = 1,
    pageSize = 100,
    search = ""
  ) => {

  const response =
    await axiosInstance.get(
      `/Jobs?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`
    );

  return response.data;
};

export const applyToJob =
  async (jobId) => {

  const token =
    localStorage.getItem("token");

  const response =
    await axiosInstance.post(
      `/JobApplications/${jobId}`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getMyApplications =
  async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await axiosInstance.get(
      "/JobApplications/my-applications",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const cancelApplication =
  async (applicationId) => {

  const token =
    localStorage.getItem("token");

  const response =
    await axiosInstance.delete(
      `/JobApplications/cancel/${applicationId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};