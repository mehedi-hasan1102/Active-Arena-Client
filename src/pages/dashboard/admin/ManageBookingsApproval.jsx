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
      text: `Are you sure you want to approve the booking for ${
        booking.userName || booking.userEmail || 'this user'
      } on ${booking.courtName || 'this court'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#16a34a', // green-600
      cancelButtonColor: '#6b7280', // gray-500
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
      text: `Are you sure you want to reject the booking for ${
        booking.userName || booking.userEmail || 'this user'
      } on ${booking.courtName || 'this court'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626', // red-600
      cancelButtonColor: '#6b7280', // gray-500
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
      <div
        className="text-center py-10 text-lg text-gray-700 dark:text-gray-300"
        role="status"
      >
        🔄 Loading booking requests...
      </div>
    );
  if (error)
    return (
      <div
        className="text-center py-10 text-red-600 dark:text-red-400"
        role="alert"
      >
        ❌ Failed to load booking requests: {error.response?.data?.error || error.message}
      </div>
    );

  return (
    <div className="min-h-screen p-6 sm:p-10 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200">
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
  📋 Manage Booking Requests
</h1>

      

      {/* Search Input */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by court name..."
          aria-label="Search booking requests by court name"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-gray-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table
          className="min-w-full text-sm text-gray-700 dark:text-gray-300"
          aria-label="Booking requests table"
        >
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 uppercase text-xs select-none rounded-t-md">
            <tr>
              <th className="py-4 px-6 text-left font-semibold rounded-tl-md">
                User
              </th>
              <th className="py-4 px-6 text-left font-semibold">Court</th>
              <th className="py-4 px-6 text-left font-semibold">Date</th>
              <th className="py-4 px-6 text-left font-semibold">Slots</th>
              <th className="py-4 px-6 text-center font-semibold">Status</th>
              <th className="py-4 px-6 text-center font-semibold rounded-tr-md">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 italic text-gray-500 dark:text-gray-400 font-medium"
                >
                  No pending booking requests available.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="py-4 px-6 text-center font-medium">
                    {booking.userName || booking.userEmail || 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-center">{booking.courtName || 'N/A'}</td>
                  <td className="py-4 px-6 text-center">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {(booking.slots || []).join(', ')}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
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
                  <td className="py-4 px-6 text-center">
                    {booking.status === 'pending' ? (
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleApprove(booking)}
                          disabled={updateStatusMutation.isLoading}
                          aria-label={`Approve booking for ${
                            booking.userName || booking.userEmail || 'user'
                          } on ${booking.courtName || 'court'}`}
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(booking)}
                          disabled={updateStatusMutation.isLoading}
                          aria-label={`Reject booking for ${
                            booking.userName || booking.userEmail || 'user'
                          } on ${booking.courtName || 'court'}`}
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="italic text-gray-400 dark:text-gray-500 font-medium">
                        No actions
                      </span>
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
