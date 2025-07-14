
// // import React from 'react';
// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // import Swal from 'sweetalert2';
// // import axiosInstance from '../../../api/axiosInstance';

// // const ManageBookingsApproval = () => {
// //   const queryClient = useQueryClient();

// //   const { data: bookings = [], isLoading, error } = useQuery({
// //     queryKey: ['bookings'],
// //     queryFn: async () => {
// //       const res = await axiosInstance.get('/bookings');
// //       return res.data.bookings || [];
// //     },
// //   });

// //   const updateStatusMutation = useMutation({
// //     mutationFn: async ({ id, status, userEmail, userId }) => {
// //       const res = await axiosInstance.put(`/bookings/${id}/status`, { status, userEmail, userId });
// //       return res.data;
// //     },
// //     onSuccess: () => {
// //       Swal.fire('✅ Success', 'Booking status updated!', 'success');
// //       queryClient.invalidateQueries(['bookings']);
// //     },
// //     onError: () => {
// //       Swal.fire('❌ Error', 'Could not update booking status', 'error');
// //     },
// //   });

// //   const handleApprove = (booking) => {
// //     updateStatusMutation.mutate({
// //       id: booking._id,
// //       status: 'Approved',
// //       userEmail: booking.userEmail,
// //       userId: booking.userId,
// //     });
// //   };

// //   const handleReject = (id) => {
// //     updateStatusMutation.mutate({ id, status: 'Rejected' });
// //   };

// //   if (isLoading)
// //     return (
// //       <div className="text-center py-10 text-lg dark:text-gray-300">🔄 Loading bookings...</div>
// //     );
// //   if (error)
// //     return (
// //       <div className="text-red-500 dark:text-red-400 text-center py-10">
// //         ❌ Failed to load bookings
// //       </div>
// //     );

// //   return (
// //     <div className="p-6 dark:bg-gray-900 min-h-screen">
// //       <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
// //         📋 Manage Booking Requests
// //       </h1>

// //       <div className="overflow-x-auto shadow rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
// //         <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
// //           <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-600 dark:text-gray-400 uppercase text-xs">
// //             <tr>
// //               <th className="py-3 px-4 text-left">User ID</th>
// //               <th className="py-3 px-4 text-left">Court ID</th>
// //               <th className="py-3 px-4 text-left">Date</th>
// //               <th className="py-3 px-4 text-left">Slots</th>
// //               <th className="py-3 px-4 text-center">Status</th>
// //               <th className="py-3 px-4 text-center">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {bookings.length === 0 ? (
// //               <tr>
// //                 <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
// //                   No booking requests available.
// //                 </td>
// //               </tr>
// //             ) : (
// //               bookings.map((booking) => (
// //                 <tr
// //                   key={booking._id}
// //                   className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
// //                 >
// //                   <td className="py-3 px-4">{booking.userId || 'N/A'}</td>
// //                   <td className="py-3 px-4">{booking.courtId || 'N/A'}</td>
// //                   <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
// //                   <td className="py-3 px-4">{(booking.slots || []).join(', ')}</td>
// //                   <td className="py-3 px-4 text-center">
// //                     <span
// //                       className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
// //                         booking.status === 'Approved'
// //                           ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
// //                           : booking.status === 'Rejected'
// //                           ? 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-100'
// //                           : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100'
// //                       }`}
// //                     >
// //                       {booking.status}
// //                     </span>
// //                   </td>
// //                   <td className="py-3 px-4 text-center">
// //                     {booking.status === 'pending' ? (
// //                       <div className="flex justify-center gap-2">
// //                         <button
// //                           onClick={() => handleApprove(booking)}
// //                           disabled={updateStatusMutation.isLoading}
// //                           className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm transition-all duration-200 disabled:opacity-50"
// //                         >
// //                           Approve
// //                         </button>
// //                         <button
// //                           onClick={() => handleReject(booking._id)}
// //                           disabled={updateStatusMutation.isLoading}
// //                           className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm transition-all duration-200 disabled:opacity-50"
// //                         >
// //                           Reject
// //                         </button>
// //                       </div>
// //                     ) : (
// //                       <span className="text-gray-400 dark:text-gray-500 italic">No actions</span>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ManageBookingsApproval;
// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../../api/axiosInstance';

// const ManageBookingsApproval = () => {
//   const queryClient = useQueryClient();

//   const { data: bookings = [], isLoading, error } = useQuery({
//     queryKey: ['bookings'],
//     queryFn: async () => {
//       const res = await axiosInstance.get('/bookings');
//       return res.data.bookings || [];
//     },
//   });

//   const updateStatusMutation = useMutation({
//     mutationFn: async ({ id, status, userEmail, userId }) => {
//       const res = await axiosInstance.put(`/bookings/${id}/status`, { status, userEmail, userId });
//       return res.data;
//     },
//     onSuccess: () => {
//       Swal.fire('✅ Success', 'Booking status updated!', 'success');
//       queryClient.invalidateQueries(['bookings']);
//     },
//     onError: (error) => {
//       Swal.fire('❌ Error', error.response?.data?.error || 'Could not update booking status', 'error');
//     },
//   });

//   const handleApprove = (booking) => {
//     Swal.fire({
//       title: 'Confirm Approval',
//       text: `Are you sure you want to approve the booking for ${booking.userName || booking.userEmail || 'this user'}?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Approve',
//       cancelButtonText: 'Cancel',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         updateStatusMutation.mutate({
//           id: booking._id,
//           status: 'Approved',
//           userEmail: booking.userEmail,
//           userId: booking.userId,
//         });
//       }
//     });
//   };

//   const handleReject = (id, userName, userEmail) => {
//     Swal.fire({
//       title: 'Confirm Rejection',
//       text: `Are you sure you want to reject the booking for ${userName || userEmail || 'this user'}?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Reject',
//       cancelButtonText: 'Cancel',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         updateStatusMutation.mutate({ id, status: 'Rejected' });
//       }
//     });
//   };

//   if (isLoading)
//     return (
//       <div className="text-center py-10 text-lg dark:text-gray-300" role="status">
//         🔄 Loading bookings...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="text-red-500 dark:text-red-400 text-center py-10" role="alert">
//         ❌ Failed to load bookings: {error.message}
//       </div>
//     );

//   return (
//     <div className="p-6 dark:bg-gray-900 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
//         📋 Manage Booking Requests
//       </h1>

//       <div className="overflow-x-auto shadow rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
//         <table className="min-w-full text-sm text-gray-700 dark:text-gray-300" aria-label="Booking requests table">
//           <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-600 dark:text-gray-400 uppercase text-xs">
//             <tr>
//               <th className="py-3 px-4 text-left" scope="col">User</th>
//               <th className="py-3 px-4 text-left" scope="col">Court</th>
//               <th className="py-3 px-4 text-left" scope="col">Date</th>
//               <th className="py-3 px-4 text-left" scope="col">Slots</th>
//               <th className="py-3 px-4 text-center" scope="col">Status</th>
//               <th className="py-3 px-4 text-center" scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
//                   No booking requests available.
//                 </td>
//               </tr>
//             ) : (
//               bookings.map((booking) => (
//                 <tr
//                   key={booking._id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
//                 >
//                   <td className="py-3 px-4">{booking.userName || booking.userEmail || 'N/A'}</td>
//                   <td className="py-3 px-4">{booking.courtName || 'N/A'}</td>
//                   <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
//                   <td className="py-3 px-4">{(booking.slots || []).join(', ')}</td>
//                   <td className="py-3 px-4 text-center">
//                     <span
//                       className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
//                         booking.status === 'Approved'
//                           ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
//                           : booking.status === 'Rejected'
//                           ? 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-100'
//                           : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100'
//                       }`}
//                     >
//                       {booking.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     {booking.status === 'pending' ? (
//                       <div className="flex justify-center gap-2">
//                         <button
//                           onClick={() => handleApprove(booking)}
//                           disabled={updateStatusMutation.isLoading}
//                           className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm transition-all duration-200 disabled:opacity-50"
//                           aria-label={`Approve booking for ${booking.userName || booking.userEmail || 'user'}`}
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => handleReject(booking._id, booking.userName, booking.userEmail)}
//                           disabled={updateStatusMutation.isLoading}
//                           className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm transition-all duration-200 disabled:opacity-50"
//                           aria-label={`Reject booking for ${booking.userName || booking.userEmail || 'user'}`}
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     ) : (
//                       <span className="text-gray-400 dark:text-gray-500 italic">No actions</span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageBookingsApproval;
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/axiosInstance';

const ManageBookingsApproval = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ['pendingBookings', searchTerm],
    queryFn: async () => {
      const res = await axiosInstance.get('/bookings', {
        params: { status: 'pending', courtName: searchTerm || undefined },
      });
      return res.data.bookings || [];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, userEmail, userId }) => {
      const res = await axiosInstance.put(`/bookings/${id}/status`, { status, userEmail, userId });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('✅ Success', 'Booking status updated!', 'success');
      queryClient.invalidateQueries(['pendingBookings']);
    },
    onError: (error) => {
      Swal.fire('❌ Error', error.response?.data?.error || 'Could not update booking status', 'error');
    },
  });

  const handleApprove = (booking) => {
    Swal.fire({
      title: 'Confirm Approval',
      text: `Are you sure you want to approve the booking for ${booking.userName || booking.userEmail || 'this user'} on ${booking.courtName || 'this court'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({
          id: booking._id,
          status: 'Approved',
          userEmail: booking.userEmail,
          userId: booking.userId,
        });
      }
    });
  };

  const handleReject = (booking) => {
    Swal.fire({
      title: 'Confirm Rejection',
      text: `Are you sure you want to reject the booking for ${booking.userName || booking.userEmail || 'this user'} on ${booking.courtName || 'this court'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({
          id: booking._id,
          status: 'Rejected',
          userEmail: booking.userEmail,
          userId: booking.userId,
        });
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading)
    return (
      <div className="text-center py-10 text-lg dark:text-gray-300" role="status">
        🔄 Loading booking requests...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 dark:text-red-400 text-center py-10" role="alert">
        ❌ Failed to load booking requests: {error.response?.data?.error || error.message}
      </div>
    );

  return (
    <div className="p-4 sm:p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        📋 Manage Booking Requests
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by court name..."
          className="w-full max-w-md p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Search booking requests by court name"
        />
      </div>

      <div className="overflow-x-auto shadow rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-300" aria-label="Booking requests table">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-600 dark:text-gray-400 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left" scope="col">User</th>
              <th className="py-3 px-4 text-left" scope="col">Court</th>
              <th className="py-3 px-4 text-left" scope="col">Date</th>
              <th className="py-3 px-4 text-left" scope="col">Slots</th>
              <th className="py-3 px-4 text-center" scope="col">Status</th>
              <th className="py-3 px-4 text-center" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No pending booking requests available.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">{booking.userName || booking.userEmail || 'N/A'}</td>
                  <td className="py-3 px-4">{booking.courtName || 'N/A'}</td>
                  <td className="py-3 px-4">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{(booking.slots || []).join(', ')}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'Approved'
                          ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
                          : booking.status === 'Rejected'
                          ? 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-100'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {booking.status === 'pending' ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleApprove(booking)}
                          disabled={updateStatusMutation.isLoading}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm transition-all duration-200 disabled:opacity-50"
                          aria-label={`Approve booking for ${booking.userName || booking.userEmail || 'user'} on ${booking.courtName || 'court'}`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(booking)}
                          disabled={updateStatusMutation.isLoading}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm transition-all duration-200 disabled:opacity-50"
                          aria-label={`Reject booking for ${booking.userName || booking.userEmail || 'user'} on ${booking.courtName || 'court'}`}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 italic">No actions</span>
                    )}
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

export default ManageBookingsApproval;