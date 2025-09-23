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
            <div className="grid gap-6">


                {/* Module & Menu */}
                <div className="bg-white shadow p-4 rounded">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-xl">Module & Menu</h2>
                        <h2 className="flex gap-2">
                            <button
                            onClick={() => {
                                resetForm();
                                setShowModal(true);
                            }}
                            className="px-4 py-2 bg-blue-800 text-white rounded"
                        >
                            + Module
                        </button>
                        <button
                            onClick={() => {
                                resetFormMenu();
                                setShowModalMenu(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            + Menu
                        </button>
                        </h2>
                    </div>

<table className="min-w-full border">
  <tbody>
    {modules.map((module) => {
      const Icon = HeroIcons[module.icon] || HeroIcons.ViewGridIcon;
      return (
        <React.Fragment key={module.id}>
          <tr className="bg-gray-100">
            <td colSpan="2" className="p-2 border">
                <button
                                                className={`${
                                                    module.style ||
                                                    "bg-gray-500"
                                                } flex items-center gap-2 p-2 rounded text-white px-4`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                {module.name}
                                            </button>
                <i className="text-sm">Module Description : {module.desc}</i>
            </td>
            <td className="p-2 border">
                    <button
                                                onClick={() =>
                                                    handleEdit(module)
                                                }
                                                className="text-blue-500 hover:underline"
                                            >
                                                <HeroIcons.PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(module.id)
                                                }
                                                className="text-red-500 hover:underline"
                                            >
                                                <HeroIcons.TrashIcon className="h-5 w-5" />
                                            </button>
            </td>
          </tr>
          {module.menus.map((menu) => (
          <tr key={menu.id}>
            <td className="p-2 border">{menu.menu}</td>
            <td className="p-2 border">{menu.url}</td>
            <td className="p-2 border">
              <button
                onClick={() => handleEditMenu(menu)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMenu(menu.id)}
                className="text-red-500 hover:underline ml-2"
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
            {/* Modal Module */}{" "}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    {" "}
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                        {" "}
                        <h2 className="font-bold mb-4">
                            {" "}
                            {form.id ? "Edit Module" : "Tambah Module"}{" "}
                        </h2>{" "}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {" "}
                            <div className="grid grid-cols-3 gap-4">
                                {" "}
                                {/* Name */}{" "}
                                <div className="col-span-3">
                                    {" "}
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Module Name"
                                        className="border rounded w-full p-2"
                                    />{" "}
                                    {errors?.name && (
                                        <div className="text-red-500 text-sm">
                                            {errors.name}
                                        </div>
                                    )}{" "}
                                </div>{" "}
                                {/* Icon */}{" "}
                                <div className="col-span-1">
                                    {" "}
                                    <input
                                        type="text"
                                        value={form.icon}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                icon: e.target.value,
                                            })
                                        }
                                        placeholder="Icon (misal: ViewGridIcon)"
                                        className="border rounded w-full p-2"
                                    />{" "}
                                    {errors?.icon && (
                                        <div className="text-red-500 text-sm">
                                            {errors.icon}
                                        </div>
                                    )}{" "}
                                </div>{" "}
                                {/* Style */}{" "}
                                <div className="col-span-2">
                                    {" "}
                                    <input
                                        type="text"
                                        value={form.style}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                style: e.target.value,
                                            })
                                        }
                                        placeholder="Custom Style (misal: bg-blue-500 text-white)"
                                        className="border rounded w-full p-2"
                                    />{" "}
                                    {errors?.style && (
                                        <div className="text-red-500 text-sm">
                                            {errors.style}
                                        </div>
                                    )}{" "}
                                </div>{" "}
                            </div>{" "}
                            <div>
                                {" "}
                                <input
                                    type="text"
                                    value={form.desc}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            desc: e.target.value,
                                        })
                                    }
                                    placeholder="Description"
                                    className="border rounded w-full p-2"
                                />{" "}
                                {errors?.desc && (
                                    <div className="text-red-500 text-sm">
                                        {errors.desc}
                                    </div>
                                )}{" "}
                            </div>{" "}
                            <div className="flex justify-end gap-2">
                                {" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                        setShowModal(false);
                                    }}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    {" "}
                                    Cancel{" "}
                                </button>{" "}
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    {" "}
                                    {form.id ? "Update" : "Save"}{" "}
                                </button>{" "}
                            </div>{" "}
                        </form>{" "}
                    </div>{" "}
                </div>
            )}
            {/* Modal Menu */}
            {showModalMenu && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                        <h2 className="font-bold mb-4">
                            {formMenu.id ? "Edit Menu" : "Tambah Menu"}
                        </h2>
                        <form onSubmit={handleSubmitMenu} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    value={formMenu.menu}
                                    onChange={(e) =>
                                        setFormMenu({
                                            ...formMenu,
                                            menu: e.target.value,
                                        })
                                    }
                                    placeholder="Menu Name"
                                    className="border rounded w-full p-2"
                                />
                                {errorsMenu?.menu && (
                                    <div className="text-red-500 text-sm">
                                        {errorsMenu.menu}
                                    </div>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    value={formMenu.url}
                                    onChange={(e) =>
                                        setFormMenu({
                                            ...formMenu,
                                            url: e.target.value,
                                        })
                                    }
                                    placeholder="Menu URL"
                                    className="border rounded w-full p-2"
                                />
                                {errorsMenu?.url && (
                                    <div className="text-red-500 text-sm">
                                        {errorsMenu.url}
                                    </div>
                                )}
                            </div>

                            <div>
                                <select
                                    value={formMenu.module_id}
                                    onChange={(e) =>
                                        setFormMenu({
                                            ...formMenu,
                                            module_id: e.target.value,
                                        })
                                    }
                                    className="border rounded w-full p-2"
                                >
                                    <option value="">-- Pilih Module --</option>
                                    {modules.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name}
                                        </option>
                                    ))}
                                </select>
                                {errorsMenu?.module_id && (
                                    <div className="text-red-500 text-sm">
                                        {errorsMenu.module_id}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetFormMenu();
                                        setShowModalMenu(false);
                                    }}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
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
