

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axiosInstance';
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
      const res = await axiosInstance.get('/courts');
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

      const res = await axiosInstance.post('/courts', courtData);
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

      const res = await axiosInstance.put(`/courts/${editingCourt._id}`, updatedCourt);
      Swal.fire('Updated', res.data.message, 'success');
      setEditingCourt(null);
      fetchCourts();
    } catch {
      Swal.fire('Error', 'Failed to update court', 'error');
    }
  };

  const handleDeleteCourt = async (id) => {
    try {
      const res = await axiosInstance.delete(`/courts/${id}`);
      Swal.fire('Deleted', res.data.message, 'success');
      fetchCourts();
    } catch {
      Swal.fire('Error', 'Failed to delete court', 'error');
    }
  };

  return (
    <div className="p-6 dark:bg-zinc-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">🏟 Manage Courts</h1>

      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-xl  mb-4 font-semibold  rounded-md 
 ">
          {editingCourt ? '✏️ Edit Court' : '➕ Add New Court'}
        </h2>

        <form onSubmit={editingCourt ? handleUpdateCourt : handleAddCourt} className="space-y-4">
          {['name', 'type', 'price', 'image', 'availableSlots'].map((field) => (
            <input
              key={field}
              type={field === 'price' ? 'number' : 'text'}
              placeholder={
                field === 'availableSlots'
                  ? 'Available Slots (comma separated)'
                  : `Court ${field.charAt(0).toUpperCase() + field.slice(1)}`
              }
              value={editingCourt ? editingCourt[field] : newCourt[field]}
              onChange={(e) =>
                editingCourt
                  ? setEditingCourt({ ...editingCourt, [field]: e.target.value })
                  : setNewCourt({ ...newCourt, [field]: e.target.value })
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          ))}

          <select
            value={editingCourt ? editingCourt.status : newCourt.status}
            onChange={(e) =>
              editingCourt
                ? setEditingCourt({ ...editingCourt, status: e.target.value })
                : setNewCourt({ ...newCourt, status: e.target.value })
            }
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition"
            >
              {editingCourt ? 'Update Court' : 'Add Court'}
            </button>
            {editingCourt && (
              <button
                type="button"
                onClick={() => setEditingCourt(null)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">📋 Existing Courts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-t-md overflow-hidden text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              {['Name', 'Type', 'Status', 'Price', 'Slots', 'Actions'].map((heading) => (
                <th key={heading} className="py-3 px-4 border border-gray-300 dark:border-gray-700">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center text-gray-800 dark:text-gray-200">
            {courts.map((court) => (
              <tr
                key={court._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition border-b border-gray-300 dark:border-gray-700"
              >
                <td className="py-2 px-4 border">{court.name}</td>
                <td className="py-2 px-4 border">{court.type}</td>
                <td className="py-2 px-4 border">{court.status}</td>
                <td className="py-2 px-4 border">৳{court.price}</td>
                <td className="py-2 px-4 border">{(court.availableSlots || []).join(', ')}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => setEditingCourt(court)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourt(court._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
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