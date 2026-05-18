import { useState } from "react";

import { toast }
from "react-toastify";

import { registerUser }
from "../../services/authService";

function RegisterPage() {

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      city: "",
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
        await registerUser(formData);

      toast.success(
        response.message
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
        city: "",
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Registration failed"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Register
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="form-control mb-3"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="form-control mb-3"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

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

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className="form-control mb-3"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />

              <select
                name="gender"
                className="form-control mb-3"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>

              <input
                type="text"
                name="city"
                placeholder="City"
                className="form-control mb-3"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Register
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;