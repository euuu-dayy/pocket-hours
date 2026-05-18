import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import axiosInstance from "../../api/axios";

import { Link } from "react-router-dom";

function ManageJobsPage() {
  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get(
        "/Jobs?pageNumber=1&pageSize=100",
      );

      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/Jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job deleted successfully");

      fetchJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="
          d-flex
          justify-content-between
          align-items-center
          mb-4
        "
      >
        <h2>Manage Jobs</h2>
      </div>

      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-4 mb-4" key={job.id}>
            <div
              className="
                card
                shadow
                h-100
              "
            >
              <div className="card-body">
                <h5 className="mb-3">{job.title}</h5>

                <p className="mb-2">
                  <strong>City:</strong> {job.city}
                </p>

                <p className="mb-2">
                  <strong>Amount:</strong> ₹{job.amount}
                </p>

                <p className="mb-2">
                  <strong>Boys Vacancies:</strong> {job.boysVacancies}
                </p>

                <p className="mb-2">
                  <strong>Girls Vacancies:</strong> {job.girlsVacancies}
                </p>

                <p className="mb-2">
                  <strong>Start Date:</strong>{" "}
                  {new Date(job.startDate).toLocaleDateString()}
                </p>

                <p className="mb-2">
                  <strong>End Date:</strong>{" "}
                  {new Date(job.endDate).toLocaleDateString()}
                </p>

                <p className="mb-2">
                  <strong>Address:</strong> {job.address}
                </p>

                <p className="mb-2">
                  <strong>Transportation:</strong>{" "}
                  {job.transportationProvided ? "Yes" : "No"}
                </p>

                <p className="mb-2">
                  <strong>Food:</strong> {job.foodProvided ? "Yes" : "No"}
                </p>

                <p className="mb-3">
                  <strong>Description:</strong>
                  <br />
                  {job.description}
                </p>

                {job.addressLink && (
                  <a
                    href={job.addressLink}
                    target="_blank"
                    rel="noreferrer"
                    className="
                        btn
                        btn-outline-dark
                        w-100
                        mb-2
                    "
                  >
                    View Location
                  </a>
                )}

                <div
                  className="
                    d-flex
                    gap-2
                    mt-3
                    "
                >
                  <Link
                    to={`/admin/update-job/${job.id}`}
                    className="
                        btn
                        btn-warning
                        w-100
                    "
                  >
                    Update
                  </Link>

                  <button
                    className="
                        btn
                        btn-danger
                        w-100
                    "
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageJobsPage;
