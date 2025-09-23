import React, { useState } from 'react';
import { HomeIcon, UserIcon, PlusIcon } from '@heroicons/react/outline';
import { Link } from '@inertiajs/react';

const menuItems = [
    { icon: <HomeIcon style={{ width: 20, height: 20 }} />, label: 'Home' },
    { icon: <UserIcon style={{ width: 20, height: 20 }} />, label: 'Profile' },
    { icon: <PlusIcon style={{ width: 20, height: 20 }} />, label: 'ShortCut' },
];

export default function SideBar() {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="w-16 bg-gray-600 fixed flex flex-col items-center pt-5 h-full">
            {menuItems.map((item, idx) => (
                <div
                    key={idx}
                    className="relative mb-7 cursor-pointer"
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <div className="text-white text-2xl rounded hover:bg-white hover:text-gray-800 hover:p-1">
                        <Link href={`/${item.label.toLowerCase()}`}>
                            {item.icon}
                        </Link>
                    </div>
                    {hovered === idx && (
                        <div className="absolute left-10 top-1/2 -translate-y-1/2 bg-gray-600 text-white px-4 py-2 rounded shadow-lg whitespace-nowrap">
                            {item.label}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}