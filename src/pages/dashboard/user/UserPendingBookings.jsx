// import React, { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';

// import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2';
// import { auth } from '../../../context/firebase/firebase.config';

// const UserPendingBookings = () => {
//   const [user] = useAuthState(auth);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     if (!user?.email) return;

//     fetch(`http://localhost:5000/bookings?email=${user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const pending = data.filter((b) => b.status === 'pending');
//         setBookings(pending);
//       })
//       .catch((err) => console.error(err));
//   }, [user?.email]);

//   const handleCancel = async (id) => {
//     const confirm = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'You want to cancel this booking?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, cancel it!',
//     });

//     if (confirm.isConfirmed) {
//       fetch(`http://localhost:5000/${id}`, {
//         method: 'DELETE',
//       })
//         .then((res) => res.json())
//         .then(() => {
//           Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
//           setBookings((prev) => prev.filter((item) => item._id !== id));
//         })
//         .catch(() => Swal.fire('Error', 'Failed to cancel booking.', 'error'));
//     }
//   };

//   return (
//     <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
//       <Helmet>
//         <title>Pending Bookings - ActiveArena</title>
//       </Helmet>

//       <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8">
//         🕒 Pending Bookings
//       </h1>

//       {bookings.length === 0 ? (
//         <p className="text-center text-gray-700 dark:text-gray-300">
//           You have no pending bookings.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-500 space-y-2"
//             >
//               <h2 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300">
//                 {booking.courtType}
//               </h2>
//               <p className="text-gray-700 dark:text-gray-300">Slot: {booking.slot}</p>
//               <p className="text-gray-700 dark:text-gray-300">Date: {booking.date}</p>
//               <p className="text-gray-700 dark:text-gray-300">Price: ${booking.price}</p>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Status: <span className="font-semibold text-yellow-600">Pending</span>
//               </p>
//               <button
//                 onClick={() => handleCancel(booking._id)}
//                 className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1.5 rounded"
//               >
//                 Cancel Booking
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserPendingBookings;
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { auth } from '../../../context/firebase/firebase.config';

const UserPendingBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);
    fetch(`http://localhost:5000/bookings?userId=${user.uid}&status=pending`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || []);
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
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
          setBookings((prev) => prev.filter((item) => item._id !== id));
        })
        .catch(() => Swal.fire('Error', 'Failed to cancel booking.', 'error'));
    }
  };

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>Pending Bookings - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8">
        🕒 Pending Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          You have no pending bookings.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-500 space-y-2"
            >
              <h2 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300">
                {booking.courtName || 'Unknown Court'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">Slot(s): {booking.slots.join(', ')}</p>
              <p className="text-gray-700 dark:text-gray-300">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300">Price: ${booking.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: <span className="font-semibold text-yellow-600">{booking.status}</span>
              </p>
              <button
                onClick={() => handleCancel(booking._id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1.5 rounded"
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
