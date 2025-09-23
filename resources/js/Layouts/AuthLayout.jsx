export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded shadow">
        {children}
      </div>
    </div>
  );
}
