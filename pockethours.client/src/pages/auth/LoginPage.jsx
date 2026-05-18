import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { toast }
from "react-toastify";

import { loginUser }
from "../../services/authService";

function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response =
        await loginUser(formData);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      toast.success(
        "Login successful"
      );

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Login failed"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Login
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;