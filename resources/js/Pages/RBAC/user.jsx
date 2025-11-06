import { useState } from "react";
import { router } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout";
import { UserIcon } from "@heroicons/react/outline";

export default function UserPage({ users, roles }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editing, setEditing] = useState(false);

  const resetForm = () => {
    setForm({ name: "", email: "" });
    setEditing(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      router.put(`/user/${form.id}`, form, {
        onSuccess: () => {
          resetForm();
          setShowModal(false);
        },
      });
    } else {
      router.post("/user", form, {
        onSuccess: () => {
          resetForm();
          setShowModal(false);
        },
      });
    }
  };

  const handleAssignRole = (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedRole) return;

    router.put(
      `/user-role/${selectedUser.id}`,
      { user_id: selectedUser.id, role_id: selectedRole },
      {
        onSuccess: () => {
          setSelectedUser(null);
          setSelectedRole("");
        },
      }
    );
  };

  return (
    <HomeLayout>
      <div className="grid gap-6 p-10">
        {/* Card utama */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
              👥 User Management
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <UserIcon className="w-5 h-5" />
              Add User
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Roles</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      {user.roles.length > 0 ? (
                        user.roles.map((r) => (
                          <span
                            key={r.id}
                            className="inline-block bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full mr-1"
                          >
                            {r.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">No role assigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-800 font-semibold transition"
                      >
                        Assign Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Assign Role */}
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Assign Role to <span className="font-bold">{selectedUser.name}</span>
              </h2>
              <form onSubmit={handleAssignRole} className="space-y-4">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">-- Select Role --</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Add/Edit User */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                {editing ? "Edit User" : "Add User"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowModal(false);
                    }}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                  >
                    {editing ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
