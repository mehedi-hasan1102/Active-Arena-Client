import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageCourts = () => {
  const [courts, setCourts] = useState([]);
  const [newCourt, setNewCourt] = useState({
    name: '',
    type: '',
    status: 'Available',
    price: '',
    image: '',
    availableSlots: '',
  });
  const [editingCourt, setEditingCourt] = useState(null);

  const fetchCourts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courts');
      setCourts(res.data.courts);
    } catch {
      Swal.fire('Error', 'Failed to fetch courts', 'error');
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const handleAddCourt = async (e) => {
    e.preventDefault();
    try {
      const courtData = {
        ...newCourt,
        price: parseFloat(newCourt.price),
        availableSlots: newCourt.availableSlots.split(',').map(s => s.trim()),
      };

      const res = await axios.post('http://localhost:5000/courts', courtData);
      Swal.fire('Success', res.data.message, 'success');
      setNewCourt({ name: '', type: '', status: 'Available', price: '', image: '', availableSlots: '' });
      fetchCourts();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to add court', 'error');
    }
  };

  const handleUpdateCourt = async (e) => {
    e.preventDefault();
    try {
      const updatedCourt = {
        ...editingCourt,
        price: parseFloat(editingCourt.price),
        availableSlots: Array.isArray(editingCourt.availableSlots)
          ? editingCourt.availableSlots
          : editingCourt.availableSlots.split(',').map(s => s.trim()),
      };

      const res = await axios.put(`http://localhost:5000/courts/${editingCourt._id}`, updatedCourt);
      Swal.fire('Updated', res.data.message, 'success');
      setEditingCourt(null);
      fetchCourts();
    } catch {
      Swal.fire('Error', 'Failed to update court', 'error');
    }
  };

  const handleDeleteCourt = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/courts/${id}`);
      Swal.fire('Deleted', res.data.message, 'success');
      fetchCourts();
    } catch {
      Swal.fire('Error', 'Failed to delete court', 'error');
    }
  };

  return (
    <div className="p-6 dark:bg-zinc-900 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">🏟 Manage Courts</h1>

      {/* Court Form */}
      <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
          {editingCourt ? '✏️ Edit Court' : '➕ Add New Court'}
        </h2>

       

        <form
  onSubmit={editingCourt ? handleUpdateCourt : handleAddCourt}
  className="space-y-4"
>
  {/* Name */}
  <input
    type="text"
    placeholder="Court Name"
    value={editingCourt ? editingCourt.name : newCourt.name}
    onChange={(e) =>
      editingCourt
        ? setEditingCourt({ ...editingCourt, name: e.target.value })
        : setNewCourt({ ...newCourt, name: e.target.value })
    }
    className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-blue-100 dark:bg-zinc-800 dark:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  />

  {/* Type */}
  <input
    type="text"
    placeholder="Court Type"
    value={editingCourt ? editingCourt.type : newCourt.type}
    onChange={(e) =>
      editingCourt
        ? setEditingCourt({ ...editingCourt, type: e.target.value })
        : setNewCourt({ ...newCourt, type: e.target.value })
    }
    className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-blue-100 dark:bg-zinc-800 dark:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  />

  {/* Status */}
  <select
    value={editingCourt ? editingCourt.status : newCourt.status}
    onChange={(e) =>
      editingCourt
        ? setEditingCourt({ ...editingCourt, status: e.target.value })
        : setNewCourt({ ...newCourt, status: e.target.value })
    }
    className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-blue-100 dark:bg-zinc-800 dark:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="Available">Available</option>
    <option value="Booked">Booked</option>
    <option value="Maintenance">Maintenance</option>
  </select>

  {/* Price */}
  <input
    type="number"
    placeholder="Price"
    value={editingCourt ? editingCourt.price : newCourt.price}
    onChange={(e) =>
      editingCourt
        ? setEditingCourt({ ...editingCourt, price: e.target.value })
        : setNewCourt({ ...newCourt, price: e.target.value })
    }
    className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-blue-100 dark:bg-zinc-800 dark:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  />

  {/* Image */}
  <input
    type="text"
    placeholder="Image URL"
    value={editingCourt ? editingCourt.image : newCourt.image}
    onChange={(e) =>
      editingCourt
        ? setEditingCourt({ ...editingCourt, image: e.target.value })
        : setNewCourt({ ...newCourt, image: e.target.value })
    }
    className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-blue-100 dark:bg-zinc-800 dark:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  />

  {/* Slots */}
  <input
    type="text"
    placeholder="Available Slots (comma separated)"
    value={
      editingCourt
        ? Array.isArray(editingCourt.availableSlots)
          ? editingCourt.availableSlots.join(', ')
          : editingCourt.availableSlots
        : newCourt.availableSlots
    }
    onChange={(e) =>
      editingCourt
        ? setEditingCourt({ ...editingCourt, availableSlots: e.target.value })
        : setNewCourt({ ...newCourt, availableSlots: e.target.value })
    }
    className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-blue-100 dark:bg-zinc-800 dark:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  />

  {/* Buttons */}
  <div className="flex flex-wrap gap-3">
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
    >
      {editingCourt ? 'Update Court' : 'Add Court'}
    </button>
    {editingCourt && (
      <button
        type="button"
        onClick={() => setEditingCourt(null)}
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-semibold transition"
      >
        Cancel
      </button>
    )}
  </div>
</form>

      </div>

      {/* Court Table */}
      <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">📋 Existing Courts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden text-sm">
          <thead className="bg-blue-100 dark:bg-zinc-700 text-blue-800 dark:text-blue-300">
            <tr>
              {['Name', 'Type', 'Status', 'Price', 'Slots', 'Actions'].map((heading) => (
                <th key={heading} className="py-3 px-4 border">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-800 text-blue-900 dark:text-blue-100 text-center">
            {courts.map((court) => (
              <tr key={court._id} className="hover:bg-blue-50 dark:hover:bg-zinc-700 transition">
                <td className="py-2 px-4 border">{court.name}</td>
                <td className="py-2 px-4 border">{court.type}</td>
                <td className="py-2 px-4 border">{court.status}</td>
                <td className="py-2 px-4 border">৳{court.price}</td>
                <td className="py-2 px-4 border">{(court.availableSlots || []).join(', ')}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => setEditingCourt(court)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourt(court._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourts;
