import { useState, useEffect } from 'react';

export default function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format tanggal (contoh: Rabu, 5 November 2025)
  const formattedDate = currentTime.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  // Format waktu (contoh: 13:45:09)
  const formattedTime = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-2 py-2 flex flex-col items-center shadow-md rounded-b-2xl rounded-t-none">
      {/* <small className="text-xs">{formattedDate}</small> */}
      <p className="text-lg font-bold tracking-widest">{formattedTime}</p>
    </div>
  );
}
