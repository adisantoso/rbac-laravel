import HomeLayout from '../../Layouts/HomeLayout';
import { useState, useEffect } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/outline';

export default function Home() {
  const { auth, todos: initialTodos } = usePage().props;
  const [todos, setTodos] = useState(initialTodos);

  const { data, setData, post, reset, errors, processing } = useForm({
    text: '',
  });

  // Tambah Todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!data.text.trim()) return;

    post('/dashboard/todos', {
      preserveScroll: true,
      onSuccess: (page) => {
        setTodos(page.props.todos);
        reset('text');
      },
    });
  };

  // Toggle Todo
  const toggleTodo = (id) => {
    // Optimistic update
    setTodos(current =>
      current.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)
    );

    router.put(`/dashboard/todos/${id}`, {}, {
      preserveScroll: true,
      onSuccess: (page) => setTodos(page.props.todos),
      onError: () => setTodos(initialTodos), // revert jika gagal
    });
  };

  // Hapus Todo
  const deleteTodo = (id) => {
    router.delete(`/dashboard/todos/${id}`, {
      preserveScroll: true,
      onSuccess: (page) => setTodos(page.props.todos),
    });
  };

  // Sync state jika props berubah
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  return (
    <div className="p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Profil User */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="backdrop-blur-md bg-white/50 rounded-2xl shadow-lg p-6 border border-white/30 hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            👋 Halo, <span className="text-blue-600">{auth.user.name}</span>
          </h2>
          <div className="text-gray-600 space-y-2">
            <p>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="mt-6 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-xl">
            <p className="text-sm">💡 Tetap semangat menyelesaikan tugas hari ini!</p>
          </div>
          <div className="mt-6">
            {/* Form Tambah Todo */}
        <form onSubmit={addTodo} className="mb-5">
          <textarea
            name="text"
            value={data.text}
            onChange={(e) => setData('text', e.target.value)}
            placeholder="Tambah tugas baru..."
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && addTodo(e)}
          />

          {errors.text && <p className="text-red-500 text-xs mt-1 mb-2">{errors.text}</p>}

          <button
            type="submit"
            disabled={processing}
            className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-white transition-all ${
              processing
                ? "bg-blue-400 opacity-50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <PlusCircleIcon className="w-5 h-5" />
            {processing ? "Menambahkan..." : "Save"}
          </button>
        </form>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md bg-white/50 rounded-2xl shadow-lg p-6 border border-white/30 hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
            📝 Daftar Tugas
          </h2>

          <ul className="space-y-3">
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.li 
                  key={todo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Kiri: Text + Tanggal */}
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-400 text-xs">
                      Created at :
                      <br /> 
                      {new Date(todo.created_at).toLocaleDateString('id-ID', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </p>
                    <span className={`text-gray-700  ${todo.done ? "line-through text-gray-400" : ""} whitespace-pre-line`}>
                      {todo.text}
                    </span>
                    
                  </div>

                  {/* Kanan: Checkbox + Hapus */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => toggleTodo(todo.id)}
                      className="w-5 h-5 accent-blue-600 cursor-pointer"
                    />
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Hapus"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {todos.length === 0 && (
            <p className="text-gray-400 text-center mt-6">Belum ada tugas ✨</p>
          )}
        </motion.div>

      </div>
    </div>
  );
}

Home.layout = (page) => <HomeLayout>{page}</HomeLayout>;
