// import React, { useState } from 'react';

// const ManageCoupons = () => {
//   const [coupons, setCoupons] = useState([
//     { id: 1, code: 'SUMMER20', discount: 20, expiry: '2025-08-31' },
//     { id: 2, code: 'SAVE10', discount: 10, expiry: '2025-12-31' },
//   ]);
//   const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', expiry: '' });
//   const [editingCoupon, setEditingCoupon] = useState(null);

//   const handleAddCoupon = (e) => {
//     e.preventDefault();
//     if (newCoupon.code && newCoupon.discount && newCoupon.expiry) {
//       setCoupons([...coupons, { ...newCoupon, id: coupons.length + 1 }]);
//       setNewCoupon({ code: '', discount: '', expiry: '' });
//     }
//   };

//   const handleUpdateCoupon = (e) => {
//     e.preventDefault();
//     setCoupons(coupons.map(coupon =>
//       coupon.id === editingCoupon.id ? editingCoupon : coupon
//     ));
//     setEditingCoupon(null);
//   };

//   const handleDeleteCoupon = (id) => {
//     setCoupons(coupons.filter(coupon => coupon.id !== id));
//     alert(`Coupon ${id} deleted!`);
//   };

//   return (
//     <div className="p-6 dark:bg-zinc-900 min-h-screen transition-colors duration-300">
//       <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">🎁 Manage Coupons</h1>

//       {/* Form */}
//       <div className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6 mb-10">
//         <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
//           {editingCoupon ? '✏️ Edit Coupon' : '➕ Add New Coupon'}
//         </h2>

//         <form onSubmit={editingCoupon ? handleUpdateCoupon : handleAddCoupon} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Coupon Code</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:border-blue-400 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={editingCoupon ? editingCoupon.code : newCoupon.code}
//               onChange={(e) =>
//                 editingCoupon
//                   ? setEditingCoupon({ ...editingCoupon, code: e.target.value })
//                   : setNewCoupon({ ...newCoupon, code: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Discount (%)</label>
//             <input
//               type="number"
//               className="w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:border-blue-400 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={editingCoupon ? editingCoupon.discount : newCoupon.discount}
//               onChange={(e) =>
//                 editingCoupon
//                   ? setEditingCoupon({ ...editingCoupon, discount: parseInt(e.target.value) })
//                   : setNewCoupon({ ...newCoupon, discount: parseInt(e.target.value) })
//               }
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Expiry Date</label>
//             <input
//               type="date"
//               className="w-full px-4 py-2 border rounded-md dark:bg-zinc-700 dark:border-blue-400 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={editingCoupon ? editingCoupon.expiry : newCoupon.expiry}
//               onChange={(e) =>
//                 editingCoupon
//                   ? setEditingCoupon({ ...editingCoupon, expiry: e.target.value })
//                   : setNewCoupon({ ...newCoupon, expiry: e.target.value })
//               }
//               required
//             />
//           </div>

//           <div className="flex gap-4">
//             <button
//               type="submit"
//               className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded transition"
//             >
//               {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
//             </button>

//             {editingCoupon && (
//               <button
//                 type="button"
//                 onClick={() => setEditingCoupon(null)}
//                 className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded transition"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Coupon Table */}
//       <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">📋 Existing Coupons</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border rounded-lg overflow-hidden text-sm">
//           <thead className="bg-blue-100 dark:bg-zinc-700 text-blue-800 dark:text-blue-300">
//             <tr>
//               <th className="py-3 px-4 border">Code</th>
//               <th className="py-3 px-4 border">Discount (%)</th>
//               <th className="py-3 px-4 border">Expiry Date</th>
//               <th className="py-3 px-4 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white dark:bg-zinc-800 text-center text-blue-800 dark:text-blue-200">
//             {coupons.map((coupon) => (
//               <tr key={coupon.id} className="hover:bg-blue-50 dark:hover:bg-zinc-700 transition">
//                 <td className="py-2 px-4 border">{coupon.code}</td>
//                 <td className="py-2 px-4 border">{coupon.discount}%</td>
//                 <td className="py-2 px-4 border">{coupon.expiry}</td>
//                 <td className="py-2 px-4 border space-x-2">
//                   <button
//                     onClick={() => setEditingCoupon(coupon)}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteCoupon(coupon.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageCoupons;
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

  // Fetch coupons
  const { data: coupons = [], isLoading, error } = useQuery({
    queryKey: ['coupons', searchTerm],
    queryFn: async () => {
      const res = await axiosInstance.get('/coupons', {
        params: { code: searchTerm || undefined },
      });
      return res.data.coupons || [];
    },
  });

  // Add coupon mutation
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

  // Update coupon mutation
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

  // Delete coupon mutation
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading)
    return (
      <div className="text-center py-10 text-lg dark:text-gray-300" role="status">
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
    <div className="p-4 sm:p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        🎁 Manage Coupons
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by coupon code..."
          className="w-full max-w-md p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Search coupons by code"
        />
      </div>

      {/* Add Coupon Button */}
      <div className="mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition"
        >
          ➕ Add New Coupon
        </button>
      </div>

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              ➕ Add New Coupon
            </h2>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Status
                </label>
                <select
                  value={newCoupon.status}
                  onChange={(e) => setNewCoupon({ ...newCoupon, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={addCouponMutation.isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
                >
                  Add Coupon
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded transition"
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              ✏️ Edit Coupon
            </h2>
            <form onSubmit={handleUpdateCoupon} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={editingCoupon.code}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={editingCoupon.discount}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, discount: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Status
                </label>
                <select
                  value={editingCoupon.status}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={updateCouponMutation.isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
                >
                  Update Coupon
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Table */}
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-300" aria-label="Coupons table">
          <thead className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-700 dark:to-green-800 text-gray-600 dark:text-gray-200 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left" scope="col">Code</th>
              <th className="py-3 px-4 text-left" scope="col">Discount (%)</th>
              <th className="py-3 px-4 text-left" scope="col">Status</th>
              <th className="py-3 px-4 text-center" scope="col">Actions</th>
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
                  className="hover:bg-green-50 dark:hover:bg-green-900 border-b border-gray-200 dark:border-gray-700"
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
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
                        aria-label={`Edit coupon ${coupon.code}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                        aria-label={`Delete coupon ${coupon.code}`}
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