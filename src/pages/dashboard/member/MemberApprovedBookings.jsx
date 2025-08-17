import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../context/firebase/firebase.config';
import Loading from '../../../components/Loading';
import axiosInstance from '../../../api/axiosInstance';

const MemberApprovedBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosInstance.get(`/bookings?status=Approved`)
      .then((res) => {
        const data = res.data;
        const approvedUserBookings = (data.bookings || []).filter(
          (booking) =>
            booking.userEmail === user.email &&
            booking.paymentStatus !== 'paid'
        );
        setBookings(approvedUserBookings);
      })
      .catch((err) => console.error('Error fetching bookings:', err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handlePayNow = (booking) => {
    navigate('/dashboard/payment', { state: { booking } });
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
      <Helmet>
        <title>Approved Bookings - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-8">
         Approved Bookings
      </h1>

      {loading ? (
        <Loading/>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have no approved bookings waiting for payment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 rounded-lg shadow-md p-4 border border-emerald-300 dark:border-emerald-700"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold  text-emerald-600 dark:text-emerald-400">
                  {booking.courtName || 'Unknown Court'}
                </h2>
                <p>🕒 Slot(s): {booking.slots.join(', ')}</p>
                <p>📅 Date: {new Date(booking.date).toLocaleDateString()}</p>
                <p>💰 Price: ৳{booking.price}</p>
                <p className="text-sm">
                  📌 Status: <span className="font-semibold text-green-600">{booking.status}</span>
                </p>
                <p className="text-sm">
                  💳 Payment:{" "}
                  <span className="font-medium capitalize">
                    {booking.paymentStatus || 'unpaid'}
                  </span>
                </p>
              </div>

              <button
                onClick={() => handlePayNow(booking)}
                className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-md transition"
              >
                💳 Pay Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberApprovedBookings;