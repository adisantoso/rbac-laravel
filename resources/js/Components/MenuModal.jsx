import * as HeroIcons from "@heroicons/react/outline";
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react'

export default function MenuModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeModule, setActiveModule] = useState(null);

  const { modules_acc } = usePage().props;

  const activeModData = modules_acc.find((mod) => mod.id === activeModule);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6 relative transition-all duration-200 ease-out">
        
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <HeroIcons.XIcon className="h-5 w-5" />
        </button>

        {/* Judul */}
        <h2 className="text-lg font-bold mb-6 border-b pb-2 text-gray-800">MODULES</h2>

        {/* Row Modul */}
        <div className="flex flex-wrap gap-4 mb-4 justify-center">
          <div className="border-gray-400 w-full" />
          <Link href="/home" className="flex flex-col items-center space-y-2 min-w-[80px] px-2 py-2 bg-blue-600 rounded-2xl text-white cursor-pointer hover:bg-gray-400">
              <HeroIcons.HomeIcon className="h-6 w-6" />
          <label className='text-xs font-medium'>Home</label>
          </Link>
          
          {modules_acc.map((mod) => {
            const Icon = HeroIcons[mod.icon] || HeroIcons.ViewGridIcon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(isActive ? null : mod.id)}
                className={`flex flex-col items-center space-y-2 min-w-[80px] px-2 py-2 bg-gray-600 rounded-2xl text-white cursor-pointer ${
                  isActive ? "bg-green-800 rounded-lg text-gray-600" : "hover:bg-gray-400 hover:text-white"
                }`}
              >
                <Icon className="h-6 w-6 text-gray-100" />
                <span className="text-xs font-medium">{mod.name}</span>
              </button>
            );
          })}
        </div>
        
        {/* Menu Aktif - Horizontal */}
        <h2 className="text-lg font-bold mb-4 justify-center">
          <span className="text-gray-800">Menu {activeModData?.name} :</span>
        </h2>
        {activeModData && (
          <div className="bg-blue-100 rounded-lg p-5 transition-all duration-300">
            <div className="flex space-x-4 overflow-x-auto">
              {activeModData.menus.map((menu, idx) => (
                <Link
                  key={idx}
                  href={menu.url}
                  className="flex items-center space-x-2 p-3 bg-gray-600 text-white rounded hover:bg-yellow-600"
                >
                  <span className="text-sm"><HeroIcons.ChevronRightIcon className="h-5 w-5 inline align-middle mr-1" />{menu.menu}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
