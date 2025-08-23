import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";

const ManageConfirmedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(
          "/bookings?status=Approved&paymentStatus=paid"
        );
        if (res.status !== 200) throw new Error("Failed to fetch bookings");
        const data = res.data;
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const courtName = booking.courtName?.toLowerCase() || "";
    const userEmail = booking.userEmail?.toLowerCase() || "";
    const date = new Date(booking.date).toLocaleDateString("en-GB").toLowerCase();
    const time = (booking.slots || []).join(", ").toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      booking.status?.toLowerCase() === "approved" &&
      (userEmail.includes(search) ||
        courtName.includes(search) ||
        date.includes(search) ||
        time.includes(search))
    );
  });

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 text-emerald-600 dark:text-emerald-400 p-6 rounded-lg shadow-lg max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-extrabold mb-6 text-center"> Confirmed Bookings</h1>

      <div className="flex justify-center mb-8">
  <input
    type="text"
    placeholder="Search by user email, court, date or time..."
    className="w-full max-w-xl px-4 py-3 rounded-md border border-emerald-300 dark:border-emerald-700 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    aria-label="Search bookings"
  />
</div>


      {loading && (
        <p className="text-center text-lg py-12 text-emerald-600 dark:text-emerald-400">
          Loading bookings...
        </p>
      )}

      {error && (
        <p className="text-center text-lg py-12 text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {!loading && !error && filteredBookings.length === 0 && (
        <p className="text-center text-lg py-12 text-gray-600 dark:text-gray-400">
          No confirmed bookings found.
        </p>
      )}

      {!loading && !error && filteredBookings.length > 0 && (
        <div className="overflow-x-auto rounded-xl shadow-md border border-emerald-200 dark:border-emerald-700 overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold">
              <tr>
                <th className="px-4 py-3 border-b border-emerald-200 dark:border-emerald-700">
                  User Email
                </th>
                <th className="px-4 py-3 border-b border-emerald-200 dark:border-emerald-700">
                  Court
                </th>
                <th className="px-4 py-3 border-b border-emerald-200 dark:border-emerald-700">
                  Date
                </th>
                <th className="px-4 py-3 border-b border-emerald-200 dark:border-emerald-700">
                  Time Slots
                </th>
              </tr>
            </thead>

            <tbody className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 divide-y divide-emerald-200 dark:divide-emerald-700">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id?.$oid || booking._id || booking.id}
                  className="even:bg-emerald-50 dark:even:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-700 transition-colors"
                >
                  <td className="px-4 py-3 border-b border-emerald-200 dark:border-emerald-700">
                    {booking.userEmail}
                  </td>
                  <td className="px-4 py-3 border-b border-emerald-200 dark:border-emerald-700">
                    {booking.courtName}
                  </td>
                  <td className="px-4 py-3 border-b border-emerald-200 dark:border-emerald-700">
                    {new Date(booking.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 border-b border-emerald-200 dark:border-emerald-700">
                    {(booking.slots || []).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageConfirmedBookings;
