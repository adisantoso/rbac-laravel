import { useState } from "react";
import { router } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout";
import { CheckIcon, CogIcon, PencilAltIcon, TrashIcon, UserIcon } from "@heroicons/react/outline";

export default function RolePage({ roles, modules }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);

  // state untuk modal Add Modul Access
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);

  // ---------- CRUD Role ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      router.put(`role/${editId}`, { name, desc });
    } else {
      router.post("role", { name, desc });
    }
    setName("");
    setDesc("");
    setEditId(null);
  };

  const handleEdit = (role) => {
    setEditId(role.id);
    setName(role.name);
    setDesc(role.desc);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus role ini?")) {
      router.delete(`role/${id}`);
    }
  };

  // ---------- Modul Access ----------
  const handleOpenModal = (role) => {
    setSelectedRole(role);
    setSelectedModules(role.modules.map((m) => m.id)); // preselect modules yg sudah ada
    setShowModal(true);
  };

  const handleToggleModule = (id) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const handleSaveModules = () => {
    if (!selectedRole) return;
    router.post(`/role/${selectedRole.id}/modules`, {
      role_id: selectedRole.id,
      module_id: selectedModules,
    });
    setShowModal(false);
  };

  return (
    <HomeLayout>
      <div className="grid gap-6">
        {/* Kolom Kiri - CRUD Role */}
        <div className="flex flex-col item-center bg-white shadow p-4 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Roles & Access</h1>
          {/* Form tambah/edit */}
          <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Role Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Role Description"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              {editId ? "Update" : "Tambah"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setName("");
                  setDesc("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            )}
          </form>

          {/* List Role & Module Access */}
          <table>
            <thead className="bg-gray-200 border">
              <tr>
                <th className="border px-4 py-2">Roles</th>
                <th className="border px-4 py-2">Module Access</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="border px-4 py-2">
                    <span className="font-semibold"><UserIcon className="h-5 w-5 inline-block mr-1" /> {role.name}</span> <br />
                    <i className="text-gray-500 text-sm">Description : {role.desc}</i>
                    </td>
                  <td className="border px-4 py-2">
                    <ul>
                      {role.modules && role.modules.length > 0 ? (
                        role.modules.map((module) => (
                          <li key={module.id}> <CheckIcon className="h-5 w-5 inline-block mr-1 text-green-500" /> {module.name}</li>
                        ))
                      ) : (
                        <li className="text-gray-400 italic">Belum ada modul</li>
                      )}
                    </ul>
                  </td>
                  <td className="border align-middle justify-center px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(role)}
                      className="bg-yellow-500 text-white px-1 py-1 rounded cursor-pointer hover:bg-gray-600"
                    >
                      <PencilAltIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="bg-red-500 text-white px-1 py-1 rounded cursor-pointer hover:bg-gray-600"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                                      <button
                    onClick={() => handleOpenModal(role)}
                    className="bg-blue-500 text-white px-1 py-1 rounded cursor-pointer hover:bg-gray-600"
                  >
                    <CogIcon className="h-5 w-5" />
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Modul Access */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Add Modul Access for {selectedRole?.name}
            </h2>
            <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
              {modules.map((module) => (
                <label key={module.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module.id)}
                    onChange={() => handleToggleModule(module.id)}
                  />
                  {module.name}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={handleSaveModules}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
