// export default MemberConfirmedBookings;
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "../../../context/firebase/firebase.config";
import Loading from "../../../components/Loading";
import axiosInstance from '../../../api/axiosInstance';

const MemberConfirmedBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);
    axiosInstance.get(
      `/bookings?userId=${user.uid}&status=Approved&paymentStatus=paid`
    )
      .then((res) => {
        setBookings(res.data.bookings || []);
      })
      .catch((err) => console.error("Error fetching confirmed bookings:", err))
      .finally(() => setLoading(false));
  }, [user?.uid]);

  return (
    <div className="min-h-screen px-4 py-10 bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
      <Helmet>
        <title>Confirmed Bookings - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-8">
         Confirmed Bookings
      </h1>

      {loading ? (
        < Loading/>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have no confirmed bookings.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id?.$oid || booking._id} 
              className="bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 rounded-lg shadow-md p-4 border  dark:border-emerald-700 border-l-4 border-emerald-500"
            >
              <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                {booking.courtName || "Unknown Court"}
              </h2>
              <p>🕒 Slot(s): {booking.slots.join(", ")}</p>
              <p>📅 Date: {new Date(booking.date).toLocaleDateString("en-GB")}</p>
              <p>💰 Price: ৳{booking.price}</p>
              <p className="text-sm">
                📌 Status:{" "}
                <span className="font-semibold text-green-600">{booking.status}</span>
              </p>
              <p className="text-sm">
                💳 Payment:{" "}
                <span className="font-semibold text-green-600">{booking.paymentStatus}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberConfirmedBookings;