// resources/js/Components/LockScreenModal.jsx
import { useState, useRef } from "react";

export default function LockScreenModal({ onUnlock, errorMsg  }) {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const pinValue = pin.join("");
    if (pinValue.length < 6) return alert("PIN harus 6 digit!");

    onUnlock(pinValue);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">🔒 Locked</h2>
        <p className="mb-4">Masukkan PIN untuk membuka layar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between mb-4">
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
{errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            🔑 Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
