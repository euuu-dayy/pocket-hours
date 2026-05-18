import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>

        <p className="text-muted">Manage Pocket Hours platform activities</p>
      </div>

      <div className="row">
        {/* MANAGE JOBS */}

        <div className="col-md-6 mb-4">
          <div
            className="
              card
              shadow
              border-0
              h-100
            "
          >
            <div className="card-body">
              <h4 className="mb-3">Manage Jobs</h4>

              <p>View, update and delete all jobs.</p>

              <Link
                to="/admin/jobs"
                className="
                  btn
                  btn-dark
                  w-100
                "
              >
                Open Manage Jobs
              </Link>
            </div>
          </div>
        </div>

        {/* CREATE JOB */}

        <div className="col-md-6 mb-4">
          <div
            className="
              card
              shadow
              border-0
              h-100
            "
          >
            <div className="card-body">
              <h4 className="mb-3">Create Job</h4>

              <p>Add new part-time job opportunities.</p>

              <Link
                to="/admin/create-job"
                className="
                  btn
                  btn-primary
                  w-100
                "
              >
                Create New Job
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div
            className="
      card
      shadow
      border-0
      h-100
    "
          >
            <div className="card-body">
              <h4 className="mb-3">Manage Users</h4>

              <p>View and manage platform users.</p>

              <Link
                to="/admin/users"
                className="
          btn
          btn-success
          w-100
        "
              >
                Open User Management
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
