import React, { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import { router } from '@inertiajs/react';


export default function Structural({ structurals }) {
    const [form, setForm] = useState({ id: null, name: '', description: '' });
    const [editing, setEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const resetForm = () =>
    setForm({ id: null, name: "", description: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.id) {
        router.put(`structural/${form.id}`, form);
        } else {
        router.post("/structural", form);
        }
        resetForm();
        setShowModal(false);
    };

    const handleEdit = (item) => {
        setForm(item);
        setEditing(true);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus structure ini?")) {
            router.delete(`structural/${id}`);
        }
    };

    return (
        <HomeLayout>
            <div className="grid gap-6">
            <div className="bg-white shadow p-4 rounded">
                <div className='flex justify-between items-center'>
                    <h2 className="text-lg font-semibold">Structure Management</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => { setShowModal(true) }}>Add Structure</button>
                </div>

            <table className="min-w-full mt-4 border border-gray-300">
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='px-4 py-2 text-left border'>Name</th>
                        <th className='px-4 py-2 text-left border'>Description</th>
                        <th className='px-4 py-2 text-left border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {structurals.map(item => (
                        <tr key={item.id}>
                            <td className='px-4 py-2 border'>{item.name}</td>
                            <td className='px-4 py-2 border'>{item.description}</td>
                            <td className='px-4 py-2 border'>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '8px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {structurals.length === 0 && (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            </div>

            {/* Modal Add Structure */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Add Structure
            </h2>
            <form onSubmit={handleSubmit}>
              <input className='w-full mb-4 p-2 border'
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input className='w-full mb-4 p-2 border'
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
              <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>{editing ? 'Update' : 'Save'}</button>
              {
                <button type="button" className='ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer' onClick={() => { resetForm(); setShowModal(false); }}>
                  Cancel
                </button>
              }
            </form>
          </div>
        </div>
      )}

        </HomeLayout>
    );
}