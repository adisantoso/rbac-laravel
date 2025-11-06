import { useState, useEffect, useRef } from "react";
import { usePage, router } from "@inertiajs/react";

import FlashMessage from "../Components/FlashMessage";
import Time from "../Components/Time";
import Header from "../Components/Header";
import Logo from "../Components/Logo";
import LockScreenModal from "../Components/LockScreenModal";

export default function HomeLayout({ children }) {
  const [locked, setLocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [idleCountdown, setIdleCountdown] = useState(null); // ⏳ null = belum tampil
  const idleTimer = useRef(null);
  const { auth } = usePage().props;
  const user = auth.user;



  
  // 🔒 Reset idle timer
  const resetIdleTimer = () => {
    clearTimeout(idleTimer.current);
    setIdleCountdown(null); // sembunyikan countdown kalau user aktif lagi

    // setelah 20 detik idle → mulai countdown
    idleTimer.current = setTimeout(() => {
      console.log("⏳ Idle 20 detik → mulai countdown 10 detik");
      setIdleCountdown(10);
    }, 20000);
  };

  // 🔄 Update countdown setiap 1 detik
  useEffect(() => {
    if (locked || idleCountdown === null) return;

    if (idleCountdown === 0) {
      console.log("🔒 Countdown habis → Lock screen");
      setLocked(true);
      router.post("profile-updateActivity");
      return;
    }

    const interval = setInterval(() => {
      setIdleCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [idleCountdown, locked]);

  // 🔒 Setup idle lock
  useEffect(() => {
    // 1. Cek utama: Apakah fitur lock screen diaktifkan oleh pengguna?
    if (!user?.lock_screen_enabled) {
      console.log("⛔ Idle lock disabled: Feature is turned off by user.");
      return; // Hentikan eksekusi jika fitur tidak aktif
    }

    if (!user?.pin) { // 2. Cek kedua: Apakah pengguna sudah punya PIN?
      console.log("⛔ Idle lock disabled: User does not have a PIN.");
      return;
    }

    if (user?.last_activity) {
      console.log("🔒 Last_activity sudah ada → langsung lock");
      setLocked(true);
    }

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetIdleTimer));
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer.current);
      events.forEach((e) => window.removeEventListener(e, resetIdleTimer));
    };
  }, [user?.pin, user?.last_activity, user?.lock_screen_enabled]); // Tambahkan user.lock_screen_enabled ke dependency array



  // 🔑 Fungsi verifikasi PIN ke backend
  const handleUnlock = (enteredPin) => {
    router.post(
      "profile-unlock",
      { pin: enteredPin },
      {
        preserveScroll: true,
        onSuccess: () => {
          console.log("✅ PIN benar → unlock");
          setLocked(false);
          setErrorMsg("");
          resetIdleTimer(); // reset lagi setelah unlock
        },
        onError: () => {
          console.log("❌ PIN salah");
          setErrorMsg("Wrong PIN. Please try again.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modal Lock Screen */}
      {locked && <LockScreenModal onUnlock={handleUnlock} errorMsg={errorMsg} user={user} />}
      {/* LOGO */}
      <Logo />
      {/* HEADER */}
      <Header />
      {/* TIME */}
      <Time />
      {/* BODY */}
      <div className="flex flex-1 h-0 relative">
        <div className="flex flex-col flex-1">
          <main className="flex-1 overflow-y-auto p-6 bg-gray-200 dark:bg-gray-800">
            <FlashMessage />
            <div className="mt-12">
            {children}
            </div>
          </main>
          {/* Countdown Popup Centered */}
            {!locked && idleCountdown !== null && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                              bg-red-700/80 text-white text-sm px-4 py-4 rounded-lg shadow-lg transition-opacity duration-300">
                🔐Screen locked for {idleCountdown} seconds.
              </div>
            )}
          {/* FOOTER */}
          <footer className="bg-gray-300 dark:bg-gray-900 text-gray-800 p-4 text-end text-sm dark:text-white">
            © 2025 SuperCode. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
