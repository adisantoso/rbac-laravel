import {
  BellIcon,
  ViewGridIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/outline";

import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import MenuModal from "./MenuModal";
export default function Header () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    return (
              <header className="fixed top-1 right-0 z-50 bg-blue-800/80 text-white p-4 flex items-center space-x-4 shadow-md rounded-l-full">
              
              <button onClick={() => setIsMenuOpen(true)}
                      className="p-1 rounded text-white hover:bg-white hover:text-gray-800 cursor-pointer">
              <ViewGridIcon className="h-6 w-6" />
              </button>

              <button className="p-1 rounded hover:bg-gray-700 cursor-pointer">
                <BellIcon className="h-5 w-5" />
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
              <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            </header>
            
    );
}