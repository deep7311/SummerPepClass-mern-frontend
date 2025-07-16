import axios from "axios";
import React, { useEffect, useState } from "react";
import AddUser from "./AddNewUser";
import UpdateUser from "./UpdateUser";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayAddUserForm, setDisplayAddUserForm] = useState(false);
  const [displayUpdateUserForm, setDisplayUpdateUserForm] = useState(false);
  const [selectedUserToUpdate, setSelectedUserToUpdate] = useState(null);

  const { user } = useContext(AppContext);

  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const url = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/users/all?page=${page}&limit=${limit}&search=${search}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      );
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${url}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  return (
    <div className="min-h-[70%] min-w-4xl px-4 py-8 bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="max-w-2xl min-h-72 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-300 rounded py-2 px-3"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
            onClick={() => setDisplayAddUserForm(true)}
          >
            + Add User
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {user.role || "User"}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                      onClick={() => {
                        setSelectedUserToUpdate(user);
                        setDisplayUpdateUserForm(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-5 py-2 rounded-lg font-semibold shadow transition-all duration-300 
              ${
                page === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
        >
          Prev
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-lg font-semibold shadow transition-all duration-300 
              ${
                page === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
        >
          Next
        </button>
      </div>

      {/* Upload Product Form Modal */}
      {displayAddUserForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <AddUser
            setDisplayAddUserForm={setDisplayAddUserForm}
            fetchUsers={fetchUsers}
          />
        </div>
      )}

      {/* Edit Product Form Modal */}
      {displayUpdateUserForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <UpdateUser
            setDisplayUpdateUserForm={setDisplayUpdateUserForm}
            fetchUsers={fetchUsers}
            updatedUser={selectedUserToUpdate}
            setSelectedUserToUpdate={setSelectedUserToUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default Users;
