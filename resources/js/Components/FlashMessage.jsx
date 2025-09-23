// resources/js/Components/FlashMessage.jsx
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FlashMessage() {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { position: "top-center" });
    }
    if (flash?.error) {
      toast.error(flash.error, { position: "top-center" });
    }
  }, [flash]);

  return <ToastContainer autoClose={3000} hideProgressBar={false} />;
}
