import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function useModuleCrud() {
  const { errors } = usePage().props;
  const [form, setForm] = useState({
    id: null,
    name: "",
    icon: "",
    style: "",
    desc: "",
  });
  const [showModal, setShowModal] = useState(false);

  const resetForm = () =>
    setForm({ id: null, name: "", icon: "", style: "", desc: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      router.put(`module/${form.id}`, form);
    } else {
      router.post("/module", form);
    }
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (module) => {
    setForm({
      id: module.id,
      name: module.name,
      icon: module.icon || "",
      style: module.style || "",
      desc: module.desc || "",
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus module ini?")) {
      router.delete(`module/${id}`);
    }
  };

  return {
    form,
    setForm,
    showModal,
    setShowModal,
    errors,
    resetForm,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
}
