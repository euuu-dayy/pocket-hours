import { useState, useEffect } from "react";

import axiosInstance from "../../api/axios";

import { toast } from "react-toastify";

import { getProfile } from "../../services/userService";

function ProfilePage() {

  const token =
    localStorage.getItem("token");

  const [user, setUser] =
    useState(null);

  const [file, setFile] =
    useState(null);

  const [imageUrl,
    setImageUrl] =
      useState(null);

  const fetchProfile =
    async () => {

    try {

      const data =
        await getProfile();

      setUser(data);

      if (
        data.profileImageUrl
      ) {

        setImageUrl(
          `https://localhost:7244${data.profileImageUrl}`
        );
      }

    } catch (error) {

      toast.error(
        "Failed to load profile"
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpload =
    async (e) => {

    e.preventDefault();

    if (!file) {

      return toast.error(
        "Select image"
      );
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response =
        await axiosInstance.post(
          "/Users/upload-profile-image",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      toast.success(
        response.data.message
      );

      const fullImageUrl =
        `https://localhost:7244${response.data.imageUrl}`;

      setImageUrl(
        fullImageUrl
      );

      fetchProfile();

    } catch (error) {

      toast.error(
        "Upload failed"
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
              border-0
            "
          >

            <div
              className="
                bg-dark
                text-white
                text-center
                p-4
              "
            >

              <div
                className="
                  d-flex
                  justify-content-center
                  mb-3
                "
              >

                <img
                  src={
                    imageUrl
                    ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border:
                      "4px solid white",
                  }}
                />

              </div>

              <h3>
                {user?.firstName}
                {" "}
                {user?.lastName}
              </h3>

              <p className="mb-0">
                {user?.role}
              </p>

            </div>

            <div className="card-body p-4">

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="fw-bold">
                    First Name
                  </label>

                  <div className="form-control">
                    {user?.firstName}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label className="fw-bold">
                    Last Name
                  </label>

                  <div className="form-control">
                    {user?.lastName}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label className="fw-bold">
                    Email
                  </label>

                  <div className="form-control">
                    {user?.email}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label className="fw-bold">
                    Phone Number
                  </label>

                  <div className="form-control">
                    {user?.phoneNumber}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label className="fw-bold">
                    Gender
                  </label>

                  <div className="form-control">
                    {user?.gender}
                  </div>

                </div>

                <div className="col-md-6 mb-3">

                  <label className="fw-bold">
                    City
                  </label>

                  <div className="form-control">
                    {user?.city}
                  </div>

                </div>

              </div>

              <hr />

              <h5 className="mb-3">
                Upload Profile Image
              </h5>

              <form
                onSubmit={handleUpload}
              >

                <input
                  type="file"
                  className="
                    form-control
                    mb-3
                  "
                  onChange={(e) =>
                    setFile(
                      e.target.files[0]
                    )
                  }
                />

                <button
                  type="submit"
                  className="
                    btn
                    btn-primary
                    w-100
                  "
                >
                  Upload Image
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;