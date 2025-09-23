import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function useMenuModuleCrud() {
  const { errors } = usePage().props;
  const [formMenu, setFormMenu] = useState({
    id: null,
    module_id: "",
    menu: "",
    url: "",
    description: "",
  });
  const [showModalMenu, setShowModalMenu] = useState(false);

  const resetFormMenu = () =>
    setFormMenu({ id: null, module_id: "", menu: "", url: "", description: "" });

  const handleSubmitMenu = (e) => {
    e.preventDefault();
    if (formMenu.id) {
      router.put(`menu-module/${formMenu.id}`, formMenu);
    } else {
      router.post("/menu-module", formMenu);
    }
    resetFormMenu();
    setShowModalMenu(false);
  };

  const handleEditMenu = (menu) => {
    setFormMenu({
      id: menu.id,
      module_id: menu.module_id,
      menu: menu.menu,
      url: menu.url,
      description: menu.description,
    });
    setShowModalMenu(true);
  };

  const handleDeleteMenu = (id) => {
    if (confirm("Yakin ingin menghapus menu ini?")) {
      router.delete(`menu-module/${id}`);
    }
  };

  return {
    errors,
    formMenu,
    setFormMenu,
    showModalMenu,
    setShowModalMenu,
    resetFormMenu,
    handleSubmitMenu,
    handleEditMenu,
    handleDeleteMenu,
  };
}
