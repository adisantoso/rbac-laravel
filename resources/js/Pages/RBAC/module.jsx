import HomeLayout from "../../Layouts/HomeLayout";
import * as HeroIcons from "@heroicons/react/outline";
import useModuleCrud from "../../hooks/useModuleCrud";
import useMenuModuleCrud from "../../hooks/useMenuModuleCrud";
import React from "react";

export default function ModulePage({ modules, menuModules }) {
  const {
    form,
    setForm,
    showModal,
    setShowModal,
    errors,
    resetForm,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useModuleCrud();

  const {
    formMenu,
    setFormMenu,
    showModalMenu,
    setShowModalMenu,
    errors: errorsMenu,
    resetFormMenu,
    handleSubmitMenu,
    handleEditMenu,
    handleDeleteMenu,
  } = useMenuModuleCrud();

  return (
    <HomeLayout>
      <div className="space-y-6 p-10">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Module & Menu Management
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
            >
              + Add Module
            </button>
            <button
              onClick={() => {
                resetFormMenu();
                setShowModalMenu(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
            >
              + Add Menu
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-2xl p-5">
          <table className="min-w-full">
            <tbody>
              {modules.map((module) => {
                const Icon = HeroIcons[module.icon] || HeroIcons.ViewGridIcon;
                return (
                  <React.Fragment key={module.id}>
                    <tr className="border-b bg-gray-300 border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3 px-2 font-semibold text-gray-800 w-1/3">
                        <div className="flex items-center gap-3">
                          <button
                            className={`${
                              module.style || "bg-gray-500"
                            } flex items-center gap-2 px-3 py-1 rounded-lg text-white`}
                          >
                            <Icon className="h-5 w-5" />
                            {module.name}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {module.desc || (
                          <span className="italic text-gray-400">
                            No description
                          </span>
                        )}
                      </td>
                      <td className="text-right pr-3">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleEdit(module)}
                            className="p-2 bg-yellow-100 hover:bg-yellow-200 rounded-lg"
                          >
                            <HeroIcons.PencilAltIcon className="h-5 w-5 text-yellow-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(module.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                          >
                            <HeroIcons.TrashIcon className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                      <td colSpan={2}></td>
                    </tr>

                    <tr className="bg-gray-400 text-white">
                      <td className="pl-8 py-2">Menu</td>
                      <td className="py-2">Url</td>
                      <td className="py-2">Description</td>
                      <td className="text-right pr-3">Action</td>
                    </tr>

                    {module.menus.map((menu) => (
                      <tr
                        key={menu.id}
                        className="border-b border-gray-50 hover:bg-gray-50"
                      >
                        <td className="pl-8 py-2 text-gray-700 flex items-center gap-2">
                          <HeroIcons.ChevronRightIcon className="h-4 w-4 text-gray-400" />
                          {menu.menu}
                        </td>
                        <td className="py-2 text-sm text-green-700">
                          <i>URL : {menu.url}</i>
                        </td>
                        <td>{menu.desc || "No description"}</td>
                        <td className="text-right pr-3">
                          <button
                            onClick={() => handleEditMenu(menu)}
                            className="text-blue-600 hover:underline mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMenu(menu.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- Modal: Module ---------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
            <h2 className="font-semibold text-lg mb-4 text-gray-700">
              {form.id ? "Edit Module" : "Add New Module"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Module Name"
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors?.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}

              <input
                type="text"
                value={form.icon}
                onChange={(e) =>
                  setForm({ ...form, icon: e.target.value })
                }
                placeholder="Icon (e.g. ViewGridIcon)"
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                value={form.style}
                onChange={(e) =>
                  setForm({ ...form, style: e.target.value })
                }
                placeholder="Custom Style (e.g. bg-blue-500 text-white)"
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                value={form.desc}
                onChange={(e) =>
                  setForm({ ...form, desc: e.target.value })
                }
                placeholder="Description"
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <div className="flex justify-end gap-2 mt-4">
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  {form.id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Modal: Menu ---------- */}
      {showModalMenu && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
            <h2 className="font-semibold text-lg mb-4 text-gray-700">
              {formMenu.id ? "Edit Menu" : "Add New Menu"}
            </h2>
            <form onSubmit={handleSubmitMenu} className="space-y-4">
              <input
                type="text"
                value={formMenu.menu}
                onChange={(e) =>
                  setFormMenu({ ...formMenu, menu: e.target.value })
                }
                placeholder="Menu Name"
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              <input
                type="text"
                value={formMenu.url}
                onChange={(e) =>
                  setFormMenu({ ...formMenu, url: e.target.value })
                }
                placeholder="Menu URL"
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              <select
                value={formMenu.module_id}
                onChange={(e) =>
                  setFormMenu({
                    ...formMenu,
                    module_id: e.target.value,
                  })
                }
                className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option value="">-- Select Module --</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    resetFormMenu();
                    setShowModalMenu(false);
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                >
                  {formMenu.id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
