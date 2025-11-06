import { useState } from "react";
import { router } from "@inertiajs/react";
import HomeLayout from "../Layouts/HomeLayout"; 
import PinModal from "../Components/PinModal"; // 1. Import komponen baru

export default function Profile({ user }) {
  const [modalPin, setModalPin] = useState(false);
  const [formUpdatePassword, setFormUpdatePassword] = useState(false);

  return (
    <HomeLayout>
      {/* 2. Gunakan PinModal dan kontrol visibilitasnya dengan state */}
      <PinModal isOpen={modalPin} onClose={() => setModalPin(false)} user={user} />

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
            <h2 className="font-semibold">Name </h2>
            <p className="font-semibold">{user.name}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold">Email </h2>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold">Role </h2>
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
            <button className="text-white px-4 py-2 hover:underline bg-red-300 hover:bg-red-500 rounded cursor-pointer"
            onClick={() => setFormUpdatePassword(true)}
            >
              Change Password
            </button>
          </div>
        </div>
        {/* Lock Sceeen Setting */}
        <div className="flex justify-between items-center mt-2 p-4 bg-gray-100 rounded shadow">
          <h3 className="font-semibold">🔐 Lock Screen Feature</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={user.lock_screen_enabled}
              onChange={(e) => {
                router.post('profile-updateLockScreen', {
                  lock_screen_enabled: e.target.checked
                }, {
                  preserveScroll: true,
                });
              }}
              disabled={!user.pin} // Nonaktifkan jika user belum set PIN
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{user.lock_screen_enabled ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>
        
        {formUpdatePassword && (
          <div className="mb-4 space-y-2 bg-gray-100 p-4 rounded shadow">
            <h2 className="font-sm italic">Change Password :</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault(); 
                const formData = new FormData(e.target);
                router.post("profile-updatePassword", formData, {
                  onSuccess: () => setFormUpdatePassword(false),
                });
              }}>
                <div className="flex flex-col space-y-2">
              <input
                type="password"
                name="current_password"
                placeholder="Current Password"
                className="border border-gray-300 rounded p-2" required
              />
              <input
                type="password"
                name="new_password"
                placeholder="New Password"
                className="border border-gray-300 rounded p-2" required
              />
              <input
                type="password"
                name="new_password_confirmation"
                placeholder="Confirm New Password"
                className="border border-gray-300 rounded p-2" required
              />
            </div>
            <div className="flex justify-end space-x-2 mt-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setFormUpdatePassword(false)}
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">
                Save
              </button>
              </div>
              </form>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
