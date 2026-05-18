import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";

import HomePage from "./pages/public/HomePage";

import LoginPage from "./pages/auth/LoginPage";

import RegisterPage from "./pages/auth/RegisterPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminRoute from "./routes/AdminRoute";

import MyApplicationsPage from "./pages/user/MyApplicationsPage";

import ManageJobsPage from "./pages/admin/ManageJobsPage";

import CreateJobPage from "./pages/admin/CreateJobPage";

import UpdateJobPage from "./pages/admin/UpdateJobPage";

import ProfilePage from "./pages/user/ProfilePage";

import ManageUsersPage from "./pages/admin/ManageUsersPage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />

      <Navbar />

      <div
        style={{
          paddingTop: "80px",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/jobs"
            element={
              <AdminRoute>
                <ManageJobsPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/create-job"
            element={
              <AdminRoute>
                <CreateJobPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/update-job/:id"
            element={
              <AdminRoute>
                <UpdateJobPage />
              </AdminRoute>
            }
          />

          <Route
            path="/my-applications"
            element={
              <ProtectedRoute>
                <MyApplicationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <ManageUsersPage />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
