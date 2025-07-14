import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';
import { auth } from '../../../context/firebase/firebase.config';

const MemberConfirmedBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);
    fetch(`http://localhost:5000/bookings?userId=${user.uid}&status=Approved&paymentStatus=completed`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || []);
      })
      .catch((err) => console.error("Error fetching confirmed bookings:", err))
      .finally(() => setLoading(false));
  }, [user?.uid]);

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Confirmed Bookings - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-purple-700 dark:text-purple-400 mb-8">
        ✅ Confirmed Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          You have no confirmed bookings.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500 space-y-2"
            >
              <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300">
                {booking.courtName || 'Unknown Court'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">Slot(s): {booking.slots.join(', ')}</p>
              <p className="text-gray-700 dark:text-gray-300">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300">Price: ${booking.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: <span className="font-semibold text-green-600">{booking.status}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Payment: <span className="font-semibold text-purple-600">{booking.paymentStatus}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberConfirmedBookings;
