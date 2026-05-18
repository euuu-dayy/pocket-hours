import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  getMyApplications,
  cancelApplication,
} from "../../services/jobService";

function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const data = await getMyApplications();

      setApplications(data);
    } catch (error) {
      toast.error("Failed to fetch applications");
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this application?",
    );

    if (!confirmCancel) return;

    try {
      const response = await cancelApplication(id);

      toast.success(response.message);

      fetchApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  };

  const canCancel = (appliedAt) => {
    if (!appliedAt) return false;

    const appliedTime = new Date(appliedAt + "Z");

    const currentTime = new Date();

    const differenceInMs = currentTime - appliedTime;

    const differenceInMinutes = differenceInMs / (1000 * 60);

    return differenceInMinutes <= 60;
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Applications</h2>

      <div className="row">
        {applications.map((application) => (
          <div className="col-md-4 mb-4" key={application.id}>
            <div
              className="
                card
                shadow
                h-100
              "
            >
              <div className="card-body">
                <h5>{application.job.title}</h5>

                <p>
                  <strong>City:</strong> {application.job.city}
                </p>

                <p>
                  <strong>Amount:</strong> ₹{application.job.amount}
                </p>

                <p>
                  <strong>Applied At:</strong>{" "}
                  {new Date(application.appliedAt + "Z").toLocaleString()}
                </p>
              </div>

              <div className="mt-3">
                {canCancel(application.appliedAt) ? (
                  <button
                    className="
        btn
        btn-danger
        w-100
      "
                    onClick={() => handleCancel(application.id)}
                  >
                    Cancel Application
                  </button>
                ) : (
                  <button
                    className="
                        btn
                        btn-secondary
                        w-100
                    "
                    disabled
                  >
                    Cancellation Expired
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplicationsPage;
