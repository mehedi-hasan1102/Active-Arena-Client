import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../../../context/firebase/firebase.config';

const MemberApprovedBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (!user?.email) return; // Check for email instead of uid

    setLoading(true);
    // Fetch all approved bookings and filter on the client-side by email
    fetch(`http://localhost:5000/bookings?status=Approved`)
      .then((res) => res.json())
      .then((data) => {
        const approvedUserBookings = (data.bookings || []).filter(
          (booking) => booking.userEmail === user.email && booking.paymentStatus !== 'completed'
        );
        setBookings(approvedUserBookings);
      })
      .catch((err) => console.error("Error fetching bookings:", err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Function to handle navigation to the payment page
  const handlePayNow = (booking) => {
    navigate('/dashboard/payment', { state: { booking } });
  };

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Approved Bookings - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
        ✅ Approved Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          You have no approved bookings waiting for payment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border-l-4 border-green-500 flex flex-col"
            >
              <div className="flex-grow space-y-2">
                <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">
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
                  Payment: <span className="font-medium capitalize">{booking.paymentStatus}</span>
                </p>
              </div>
              {/* Pay Now Button */}
              <div className="mt-4">
                <button
                  onClick={() => handlePayNow(booking)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-transform transform hover:scale-105"
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberApprovedBookings;
