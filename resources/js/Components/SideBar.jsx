import React, { useState } from 'react';
import { ViewGridIcon, HomeIcon, UserIcon, PlusIcon } from '@heroicons/react/outline';
import { Link } from '@inertiajs/react';
import MenuModal from "../Components/MenuModal";

const menuItems = [
    { icon: <HomeIcon style={{ width: 20, height: 20 }} />, label: 'Home' },
    { icon: <PlusIcon style={{ width: 20, height: 20 }} />, label: 'Create ShortCut' },
];

export default function SideBar() {
    const [hovered, setHovered] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 left-0 h-screen w-16 bg-slate-700 text-white flex flex-col items-center py-4 space-y-4 shadow-lg z-40">
            <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1 rounded text-white hover:bg-white hover:text-gray-800 cursor-pointer"
          >
            <ViewGridIcon className="h-6 w-6" />
          </button>
            <label className='text-xs -mt-5'>Start</label>
            <div className="border-t border-gray-400 w-full" />
            {menuItems.map((item, idx) => (
                <div
                    key={idx}
                    className="relative mb-5 border-b-2 border-yellow-500 cursor-pointer"
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div className="text-white text-2xl rounded hover:bg-white hover:text-gray-800 hover:p-1">
                        <Link href={`/${item.label.toLowerCase()}`}>
                            {item.icon}
                        </Link>
                    </div>
                    {hovered === idx && (
                        <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-gray-600 text-sm text-white px-4 py-2 rounded shadow-lg whitespace-nowrap">
                            {item.label}
                        </div>
                    )}
                </div>
            ))}
            <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}