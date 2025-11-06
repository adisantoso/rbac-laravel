import { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";

export default function PinModal({ isOpen, onClose, user }) {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const inputsRef = useRef([]);

  // Reset form setiap kali modal dibuka/ditutup
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    } else {
      // Fokus ke input pertama saat modal terbuka
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // hanya angka
    if (!value) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1); // hanya ambil 1 digit
    setPin(newPin);

    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newPin = [...pin];
      if (pin[index]) {
        newPin[index] = "";
        setPin(newPin);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        newPin[index - 1] = "";
        setPin(newPin);
      }
    }
  };

  const resetForm = () => {
    setPin(["", "", "", "", "", ""]);
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pinValue = pin.join("");
    if (pinValue.length < 6) return alert("PIN harus 6 digit!");

    router.post("profile-updatePin", { pin: pinValue, password }, {
      onSuccess: () => {
        onClose(); // Tutup modal jika sukses
      },
      preserveState: true, // Agar state error bisa ditampilkan tanpa reload
      preserveScroll: true,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">{user?.pin ? "Change PIN" : "Set PIN"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between">
            {pin.map((digit, index) => (
              <input
                key={index}
                type="password"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 text-lg"
              />
            ))}
          </div>
          <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 text-lg" placeholder="Enter your password" required />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}