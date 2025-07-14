

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/axiosInstance';

const ManageCoupons = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', status: 'active' });
  const [editingCoupon, setEditingCoupon] = useState(null);

  const { data: coupons = [], isLoading, error } = useQuery({
    queryKey: ['coupons', searchTerm],
    queryFn: async () => {
      const res = await axiosInstance.get('/coupons', {
        params: { code: searchTerm || undefined },
      });
      return res.data.coupons || [];
    },
  });

  const addCouponMutation = useMutation({
    mutationFn: async (coupon) => {
      const res = await axiosInstance.post('/coupons', coupon);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('✅ Success', 'Coupon added successfully!', 'success');
      queryClient.invalidateQueries(['coupons']);
      setNewCoupon({ code: '', discount: '', status: 'active' });
      setIsAddModalOpen(false);
    },
    onError: (error) => {
      Swal.fire('❌ Error', error.response?.data?.error || 'Could not add coupon', 'error');
    },
  });

  const updateCouponMutation = useMutation({
    mutationFn: async ({ id, coupon }) => {
      const res = await axiosInstance.put(`/coupons/${id}`, coupon);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('✅ Success', 'Coupon updated successfully!', 'success');
      queryClient.invalidateQueries(['coupons']);
      setEditingCoupon(null);
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      Swal.fire('❌ Error', error.response?.data?.error || 'Could not update coupon', 'error');
    },
  });

  const deleteCouponMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/coupons/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('✅ Success', 'Coupon deleted successfully!', 'success');
      queryClient.invalidateQueries(['coupons']);
    },
    onError: (error) => {
      Swal.fire('❌ Error', error.response?.data?.error || 'Could not delete coupon', 'error');
    },
  });

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (newCoupon.code && newCoupon.discount) {
      addCouponMutation.mutate({
        code: newCoupon.code,
        discount: parseInt(newCoupon.discount),
        status: newCoupon.status,
      });
    } else {
      Swal.fire('❌ Error', 'Please fill in all required fields', 'error');
    }
  };

  const handleUpdateCoupon = (e) => {
    e.preventDefault();
    if (editingCoupon.code && editingCoupon.discount) {
      updateCouponMutation.mutate({
        id: editingCoupon._id,
        coupon: {
          code: editingCoupon.code,
          discount: parseInt(editingCoupon.discount),
          status: editingCoupon.status,
        },
      });
    } else {
      Swal.fire('❌ Error', 'Please fill in all required fields', 'error');
    }
  };

  const handleDeleteCoupon = (coupon) => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: `Are you sure you want to delete the coupon "${coupon.code}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCouponMutation.mutate(coupon._id);
      }
    });
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  if (isLoading)
    return (
      <div className="text-center py-10 text-lg text-gray-800 dark:text-gray-200" role="status">
        🔄 Loading coupons...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 dark:text-red-400 text-center py-10" role="alert">
        ❌ Failed to load coupons: {error.response?.data?.error || error.message}
      </div>
    );

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-zinc-900 min-h-screen text-gray-800 dark:text-gray-200">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
  🎁 Manage Coupons
</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by coupon code..."
          className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      

      <div className="mb-6 flex justify-center">
  <button
    onClick={() => setIsAddModalOpen(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
  >
    ➕ Add New Coupon
  </button>
</div>


      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md p-4 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">➕ Add New Coupon</h2>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                  min="1"
                  max="100"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={newCoupon.status}
                  onChange={(e) => setNewCoupon({ ...newCoupon, status: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={addCouponMutation.isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50"
                >
                  Add Coupon
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {isEditModalOpen && editingCoupon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md p-4 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">✏️ Edit Coupon</h2>
            <form onSubmit={handleUpdateCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={editingCoupon.code}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={editingCoupon.discount}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, discount: e.target.value })}
                  min="1"
                  max="100"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editingCoupon.status}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, status: e.target.value })}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={updateCouponMutation.isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50"
                >
                  Update Coupon
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">Code</th>
              <th className="py-3 px-4 text-left">Discount (%)</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No coupons available.
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr
                  key={coupon._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">{coupon.code}</td>
                  <td className="py-3 px-4">{coupon.discount}%</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        coupon.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100'
                      }`}
                    >
                      {coupon.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingCoupon(coupon);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
