export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 dark:bg-gray-900">
      <div className="w-full max-w-2xl h-100">
        {/* two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full rounded-lg shadow-lg overflow-hidden">
          <div className="col-span-1 hidden md:block">
            {/* random image slider */}
            <img
              src="https://sprinto.com/wp-content/uploads/2024/04/Featured-12.jpg"
              alt="Random"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="col-span-1 bg-white flex items-center h-full justify-center p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
