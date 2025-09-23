import { useState } from "react";
import { router } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout";

export default function UserPage({ users, roles }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editing, setEditing] = useState(false);

  const resetForm = () => {
    setForm({ name: "", email: "" });
    setEditing(false);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  } ;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      router.put(`/user/${form.id}`, form, {  
        onSuccess: () => {
          resetForm();
          setShowModal(false);
        }
      });
    } else {
      router.post("/user", form, {
        onSuccess: () => {
          resetForm();
          setShowModal(false);
        }
      });
    }
  };

  // Fungsi untuk assign role
const handleAssignRole = (e) => {
  e.preventDefault();
  if (!selectedUser || !selectedRole) return;

router.put(`/user-role/${selectedUser.id}`, {
  user_id: selectedUser.id,
  role_id: selectedRole,
}, {
  onSuccess: () => {
    setSelectedUser(null);
    setSelectedRole("");
  },
});
};


  return (
    <HomeLayout>
      <div className="grid gap-6">
        {/* User List */}
        <div className="flex flex-col items-center bg-white shadow p-4 rounded-lg w-full">
          <div className="flex justify-between items-center w-full mb-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {setShowModal(true)}}>Add User</button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border">Name</th>
                  <th className="px-4 py-2 text-left border">Email</th>
                  <th className="px-4 py-2 text-left border">Roles</th>
                  <th className="px-4 py-2 text-center border">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">
                      {user.roles.map((role) => role.name).join(", ")}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-500 hover:underline"
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
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                Assign Role to {selectedUser.name}
              </h2>
              <form onSubmit={handleAssignRole} className="space-y-4">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">-- Select Role --</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Modal Add User */}
        {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Add User   
            </h2>
            <form onSubmit={handleSubmit}>
              <input className='w-full mb-4 p-2 border'
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input className='w-full mb-4 p-2 border'
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>{editing ? 'Update' : 'Save'}</button>
              {
                <button type="button" className='ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer' onClick={() => { resetForm(); setShowModal(false); }}>
                  Cancel
                </button>
              }
            </form>
          </div>
        </div>
      )}

    </HomeLayout>
  );
}
