
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../context/firebase/firebase.config';

const MemberApprovedBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:5000/bookings?status=Approved`)
      .then((res) => res.json())
      .then((data) => {
        const approvedUserBookings = (data.bookings || []).filter(
          (booking) =>
            booking.userEmail === user.email &&
            booking.paymentStatus !== 'completed'
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
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Helmet>
        <title>Approved Bookings - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8">
        ✅ Approved Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have no approved bookings waiting for payment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">
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
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
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
