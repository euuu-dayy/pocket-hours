import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import axiosInstance
from "../../api/axios";

function CreateJobPage() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  const [formData,
    setFormData] =
      useState({
        title: "",
        startDate: "",
        endDate: "",
        boysVacancies: 0,
        girlsVacancies: 0,
        amount: 0,
        address: "",
        addressLink: "",
        city: "",
        description: "",
        transportationProvided: false,
        foodProvided: false,
      });

  const handleChange =
    (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      await axiosInstance.post(
        "/Jobs",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Job created successfully"
      );

      navigate("/admin/jobs");

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Failed to create job"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div
            className="
              card
              shadow
              p-4
            "
          >

            <h2 className="mb-4">
              Create Job
            </h2>

            <form
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                name="title"
                placeholder="Title"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
                required
              />

              <input
                type="datetime-local"
                name="startDate"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
                required
              />

              <input
                type="datetime-local"
                name="endDate"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="boysVacancies"
                placeholder="Boys Vacancies"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
              />

              <input
                type="number"
                name="girlsVacancies"
                placeholder="Girls Vacancies"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="addressLink"
                placeholder="Address Link"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                className="
                  form-control
                  mb-3
                "
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                className="
                  form-control
                  mb-3
                "
                rows="4"
                onChange={handleChange}
                required
              />

              <div
                className="
                  form-check
                  mb-2
                "
              >

                <input
                  type="checkbox"
                  name="transportationProvided"
                  className="
                    form-check-input
                  "
                  onChange={handleChange}
                />

                <label
                  className="
                    form-check-label
                  "
                >
                  Transportation Provided
                </label>

              </div>

              <div
                className="
                  form-check
                  mb-3
                "
              >

                <input
                  type="checkbox"
                  name="foodProvided"
                  className="
                    form-check-input
                  "
                  onChange={handleChange}
                />

                <label
                  className="
                    form-check-label
                  "
                >
                  Food Provided
                </label>

              </div>

              <button
                type="submit"
                className="
                  btn
                  btn-success
                  w-100
                "
              >
                Create Job
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateJobPage;