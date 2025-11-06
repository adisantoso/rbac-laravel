// resources/js/Components/LockScreenModal.jsx
import { useState, useRef } from "react";
import PinModal from "./PinModal"; // 1. Import PinModal

export default function LockScreenModal({ onUnlock, errorMsg, user }) {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [showForgotPinModal, setShowForgotPinModal] = useState(false); // 2. State untuk modal lupa PIN

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
    if (pinValue.length < 6) return alert("TYPE 6 DIGIT PIN!");

    onUnlock(pinValue);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-51">
      {/* 3. Render PinModal jika state-nya true */}
      <PinModal isOpen={showForgotPinModal} onClose={() => setShowForgotPinModal(false)} user={user} />

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-bold mb-4">🔒 SCREEN LOCKED</h2>
        <p className="mb-4">Type your PIN to unlock the screen.</p>

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
            🔑 UNLOCK
          </button>
        </form>
          <br />
          {/* forgot pin */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowForgotPinModal(true)} // 4. Tampilkan modal saat diklik
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Forgot PIN?
            </button>
          </div>
      </div>
    </div>
  );
}
