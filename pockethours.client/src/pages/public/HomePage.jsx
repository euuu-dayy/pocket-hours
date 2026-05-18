import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getAllJobs, applyToJob } from "../../services/jobService";

function HomePage() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs(pageNumber, 6, search);

      setJobs(data);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, pageNumber]);

  const handleApply = async (jobId) => {
    try {
      const response = await applyToJob(jobId);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Application failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Latest Jobs</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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

                {token && (
                  <button
                    className="
                      btn
                      btn-primary
                      w-100
                    "
                    onClick={() => handleApply(job.id)}
                  >
                    Apply Job
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="
    d-flex
    justify-content-center
    align-items-center
    gap-3
    mt-5
    mb-4
  "
      >
        <button
          className="
      btn
      btn-dark
      px-4
      py-2
      rounded-pill
      shadow-sm
    "
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          ← Previous
        </button>

        <div
          className="
      fw-bold
      fs-5
      text-primary
    "
        >
          Page {pageNumber}
        </div>

        <button
          className="
      btn
      btn-primary
      px-4
      py-2
      rounded-pill
      shadow-sm
    "
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default HomePage;
