import { useState } from "react";
import { router } from "@inertiajs/react";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  CheckIcon,
  CogIcon,
  PencilAltIcon,
  TrashIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/outline";

export default function RolePage({ roles, modules }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
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
    setSelectedModules(role.modules.map((m) => m.id));
    setShowModal(true);
  };

  const handleToggleModule = (id) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
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
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Roles & Access Management
          </h1>
          <div className="text-sm text-gray-500">
            Kelola role dan akses modul pengguna
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role List */}
          <div className="bg-white shadow-lg rounded-2xl p-5 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <UserIcon className="h-6 w-6 text-blue-600" />
              Daftar Role
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Akses Modul</th>
                    <th className="px-4 py-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr
                      key={role.id}
                      className="bg-gray-50 hover:bg-gray-100 transition rounded-xl"
                    >
                      <td className="px-4 py-3 align-top">
                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                          <UserIcon className="h-5 w-5 text-blue-500" />
                          {role.name}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {role.desc || "Tidak ada deskripsi"}
                        </p>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <button
                          onClick={() => handleOpenModal(role)}
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md mb-2 transition"
                        >
                          <CogIcon className="h-4 w-4 mr-1" /> Kelola
                        </button>
                        <ul className="text-sm space-y-1">
                          {role.modules?.length ? (
                            role.modules.map((module) => (
                              <li key={module.id}>
                                <CheckIcon className="h-4 w-4 inline text-green-500" />{" "}
                                {module.name}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-400 italic">
                              Belum ada modul
                            </li>
                          )}
                        </ul>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(role)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded-md transition"
                          >
                            <PencilAltIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(role.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Form Role */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
              <PlusIcon className="h-6 w-6 text-blue-600" />
              {editId ? "Edit Role" : "Tambah Role"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Nama Role
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Admin"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Deskripsi
                </label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tulis deskripsi singkat..."
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
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
                    className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Modul Access */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl animate-fadeIn">
            <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
              Modul untuk:{" "}
              <span className="text-blue-600">{selectedRole?.name}</span>
            </h2>
            <div className="max-h-60 overflow-y-auto mb-5 space-y-2 pr-1">
              {modules.map((module) => (
                <label
                  key={module.id}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module.id)}
                    onChange={() => handleToggleModule(module.id)}
                    className="accent-blue-600"
                  />
                  {module.name}
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 border-t pt-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Batal
              </button>
              <button
                onClick={handleSaveModules}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
