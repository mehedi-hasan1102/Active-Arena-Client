import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { auth } from '../../../context/firebase/firebase.config';
import Loading from '../../../components/Loading';
import axiosInstance from '../../../api/axiosInstance';

const UserPendingBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);
    axiosInstance.get(`/bookings?userId=${user.uid}&status=pending`)
      .then((res) => {
        setBookings(res.data.bookings || []);
      })
      .catch((err) => console.error("Error fetching bookings:", err))
      .finally(() => setLoading(false));
  }, [user?.uid]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    });

    if (confirm.isConfirmed) {
      axiosInstance.delete(`/bookings/${id}`)
        .then(() => {
          Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
          setBookings((prev) => prev.filter((item) => item._id !== id));
        })
        .catch(() => Swal.fire('Error', 'Failed to cancel booking.', 'error'));
    }
  };

  return (
    <div className="px-4 py-10 min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Pending Bookings - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-[#059669]  dark:text-[#059669]  mb-8">
        🕒 Pending Bookings
      </h1>

      {loading ? (
       <Loading/>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-800 dark:text-gray-200">
          You have no pending bookings.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-md border-l-4 border-[#059669] "
            >
              <h2 className="text-xl font-semibold text-blue-700 dark:text-[#059669] ">
                {booking.courtName || 'Unknown Court'}
              </h2>
              <p>Slot(s): {booking.slots.join(', ')}</p>
              <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p>Price: ৳{booking.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: <span className="font-semibold text-blue-600 dark:text-[#059669] ">{booking.status}</span>
              </p>
              <button
                onClick={() => handleCancel(booking._id)}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPendingBookings;
