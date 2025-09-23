import { useState, useRef } from "react";
import { router } from "@inertiajs/react";
import HomeLayout from "../Layouts/HomeLayout"; 

export default function Profile({ user }) {
  const [modalPin, setModalPin] = useState(false);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // hanya angka
    if (!value) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1); // hanya ambil 1 digit
    setPin(newPin);

    // otomatis lompat ke input berikutnya
    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // cegah default

      const newPin = [...pin];

      if (pin[index]) {
        // hapus angka di kotak saat ini
        newPin[index] = "";
        setPin(newPin);
      } else if (index > 0) {
        // kalau kosong, pindah ke kotak sebelumnya
        inputsRef.current[index - 1].focus();

        // hapus angka di kotak sebelumnya juga
        newPin[index - 1] = "";
        setPin(newPin);
      }
    }
  };

  const resetForm = () => {
    setPin(["", "", "", "", "", ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pinValue = pin.join("");
    if (pinValue.length < 6) return alert("PIN harus 6 digit!");

    const formData = new FormData();
    formData.append("pin", pinValue);

    router.post("profile-updatePin", formData, {
      onSuccess: () => {
        setModalPin(false);
        resetForm();
      },
    });
  };

  return (
    <HomeLayout>
      <div className="bg-white shadow p-6 rounded-lg max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-center">User Profile</h1>
                    <button
                onClick={() => router.post('/logout')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
            >
               🔐 Logout
            </button>
      </div>
        <div className="flex justify-center mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/55929607?v=4"
            alt="User"
            className="w-24 h-24 rounded-full mb-3"
          />
        </div>
        <div className="mb-4 space-y-2 bg-gray-100 p-4 rounded shadow">
          <h2 className="font-sm italic">Account Informations :</h2>
          <div className="flex justify-between">
            <h2 className="font-semibold">Name :</h2>
            <p className="font-semibold">{user.name}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold">Email :</h2>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold">Role :</h2>
            <p className="font-semibold">
              {user.roles.map((role) => role.name).join(", ")}
            </p>
          </div>
        </div>
        <div className="mb-4 space-y-2 bg-gray-100 p-4 rounded shadow">
          <div className="flex justify-between">
            <button
              className="text-white px-4 py-2 hover:underline bg-blue-300 hover:bg-blue-500 rounded cursor-pointer"
              onClick={() => setModalPin(true)}
            >
              {user?.pin ? "Change PIN" : "Set PIN"}
            </button>
            <button className="text-white px-4 py-2 hover:underline bg-red-300 hover:bg-red-500 rounded cursor-pointer">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {modalPin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setModalPin(false);
                resetForm();
              }}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {user?.pin ? "Change PIN" : "Set PIN"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-between">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    type="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 text-lg"
                  />
                ))}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => {
                    setModalPin(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
