import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  toast,
} from "react-toastify";

import axiosInstance
from "../../api/axios";

function UpdateJobPage() {

  const { id } =
    useParams();

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

  const fetchJob =
    async () => {

    try {

      const response =
        await axiosInstance.get(
          `/Jobs/${id}`
        );

      setFormData(response.data);

    } catch (error) {

      toast.error(
        "Failed to fetch job"
      );
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

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

      await axiosInstance.put(
        `/Jobs/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Job updated successfully"
      );

      navigate("/admin/jobs");

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Update failed"
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
              Update Job
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
                value={formData.title}
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
                value={
                  formData.startDate
                    ?.slice(0, 16)
                }
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
                value={
                  formData.endDate
                    ?.slice(0, 16)
                }
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
                value={
                  formData.boysVacancies
                }
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
                value={
                  formData.girlsVacancies
                }
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
                value={formData.amount}
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
                value={formData.address}
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
                value={
                  formData.addressLink
                }
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
                value={formData.city}
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
                value={
                  formData.description
                }
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
                  checked={
                    formData
                    .transportationProvided
                  }
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
                  checked={
                    formData.foodProvided
                  }
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
                  btn-warning
                  w-100
                "
              >
                Update Job
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UpdateJobPage;