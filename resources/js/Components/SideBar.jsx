import { useState } from 'react';
import { ViewGridIcon } from '@heroicons/react/outline';
import MenuModal from "../Components/MenuModal";

export default function SideBar() {
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
            <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
    );
}