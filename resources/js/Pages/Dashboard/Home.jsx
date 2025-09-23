import HomeLayout from '../../Layouts/HomeLayout';
import { useState } from "react";
import { router, usePage } from '@inertiajs/react';

export default function Home() {
  const { auth } = usePage().props;

    const [todos, setTodos] = useState([
    { id: 1, text: "Belajar React", done: false },
    { id: 2, text: "Buat project", done: true },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, done: false },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  return (
      <div className="grid grid-cols-2 gap-6">
        
        {/* Kolom Kiri - Task Action */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-4">Task Actions</h2>
          <ul className="space-y-3">
            <li>
                Task 1 - Kirim laporan Harian
            </li>
          </ul>
        </div>


        {/* Kolom Kanan - Todo List */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-4">Todo List</h2>
          <form onSubmit={addTodo} className="flex mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2"
              placeholder="New todo..."
            />
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700"
            >
              Add
            </button>
          </form>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span
                    className={`${
                      todo.done ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
  
    );
}

Home.layout = (page) => <HomeLayout>{page}</HomeLayout>;
