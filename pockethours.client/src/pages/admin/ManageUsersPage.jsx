import {
  useEffect,
  useState,
} from "react";

import {
  toast,
} from "react-toastify";

import {
  getAllUsers,
  deleteUser,
} from "../../services/adminUserService";

function ManageUsersPage() {

  const [users, setUsers] =
    useState([]);

  const [search,
    setSearch] =
      useState("");

  const fetchUsers =
    async () => {

    try {

      const data =
        await getAllUsers();

      setUsers(data);

    } catch (error) {

      toast.error(
        "Failed to fetch users"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete)
      return;

    try {

      const response =
        await deleteUser(id);

      toast.success(
        response.message
      );

      fetchUsers();

    } catch (error) {

      toast.error(
        error.response?.data?.message
        ||
        "Delete failed"
      );
    }
  };

  const filteredUsers =
    users.filter((user) =>
      (
        user.firstName +
        " " +
        user.lastName
      )
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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

        <h2 className="fw-bold">
          Manage Users
        </h2>

      </div>

      {/* SEARCH */}

      <div className="mb-4">

        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <div className="row">

        {filteredUsers.map(
          (user) => (

          <div
            className="
              col-md-4
              mb-4
            "
            key={user.id}
          >

            <div
              className="
                card
                shadow
                border-0
                h-100
              "
            >

              <div className="card-body">

                <div
                  className="
                    text-center
                    mb-3
                  "
                >

                  <img
                    src={
                      user.profileImageUrl
                        ?
                        `https://localhost:7244${user.profileImageUrl}`
                        :
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="Profile"
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />

                </div>

                <h5 className="text-center">

                  {user.firstName}
                  {" "}
                  {user.lastName}

                </h5>

                <hr />

                <p>
                  <strong>
                    Email:
                  </strong>
                  {" "}
                  {user.email}
                </p>

                <p>
                  <strong>
                    Phone:
                  </strong>
                  {" "}
                  {user.phoneNumber}
                </p>

                <p>
                  <strong>
                    Gender:
                  </strong>
                  {" "}
                  {user.gender}
                </p>

                <p>
                  <strong>
                    City:
                  </strong>
                  {" "}
                  {user.city}
                </p>

                <p>
                  <strong>
                    Role:
                  </strong>
                  {" "}
                  {user.role}
                </p>

                <button
                  className="
                    btn
                    btn-danger
                    w-100
                    mt-2
                  "
                  onClick={() =>
                    handleDelete(
                      user.id
                    )
                  }
                >
                  Delete User
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ManageUsersPage;