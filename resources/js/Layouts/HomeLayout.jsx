import { useState, useEffect, useRef } from "react";
import {
  BellIcon,
  MailIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { usePage, router, Link } from "@inertiajs/react";

import FlashMessage from "../Components/FlashMessage";
import SideBar from "../Components/SideBar";
import LockScreenModal from "../Components/LockScreenModal";

export default function HomeLayout({ children }) {
  const [locked, setLocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [idleCountdown, setIdleCountdown] = useState(null); // ⏳ null = belum tampil
  const idleTimer = useRef(null);
  const { auth } = usePage().props;
  const user = auth.user;

    // ✅ ambil state darkMode dari localStorage atau prefers-color-scheme
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // fallback: cek preferensi sistem
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // ✅ apply ke <html> dan simpan ke localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  
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
    if (!user?.pin) {
      console.log("⛔ Idle lock disabled: user tidak punya PIN");
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
  }, [user?.pin, user?.last_activity]);



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
          setErrorMsg("PIN salah, coba lagi!");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modal Lock Screen */}
      {locked && <LockScreenModal onUnlock={handleUnlock} errorMsg={errorMsg} />}

      {/* HEADER */}
      <header className="fixed top-1 right-0 z-50 bg-yellow-600/80 text-white p-2 flex items-center space-x-4 shadow-md rounded-l-full">
      <button className="p-1 rounded hover:bg-gray-700 cursor-pointer">
        <BellIcon className="h-5 w-5" />
      </button>
      <button className="p-1 rounded hover:bg-gray-700 cursor-pointer">
        <MailIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-1 rounded hover:bg-gray-700 cursor-pointer"
      >
        {darkMode ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </button>
      <Link href="/profile">
      <button className="p-1 rounded hover:bg-gray-700 cursor-pointer">
        <UserIcon className="h-5 w-5" />
      </button>
      </Link>
    </header>
      {/* BODY */}
      <div className="flex flex-1 h-0 relative">
        <SideBar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 overflow-y-auto p-6 bg-gray-200 dark:bg-gray-800 ml-16">
            <FlashMessage />
            <div className="mt-8">
            {children}
            </div>
          </main>
          <footer className="bg-gray-300 dark:bg-gray-900 text-gray-800 p-4 text-end text-sm dark:text-white">
            © 2025 SuperCode. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
