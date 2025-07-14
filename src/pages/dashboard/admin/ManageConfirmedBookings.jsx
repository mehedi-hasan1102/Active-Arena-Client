import React, { useState, useEffect } from "react";

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
        const res = await fetch("http://localhost:5000/bookings?status=confirmed");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.status?.toLowerCase() === "confirmed" &&
      (booking.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.court?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.date?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">📋 Confirmed Bookings</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by user, court, or date..."
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search bookings"
        />
      </div>

      {loading && (
        <p className="text-center text-gray-800 dark:text-gray-200 py-8">
          Loading bookings...
        </p>
      )}

      {error && (
        <p className="text-center text-red-600 dark:text-red-400 py-8">
          {error}
        </p>
      )}

      {!loading && !error && filteredBookings.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400 py-8">
          No confirmed bookings found.
        </p>
      )}

      {!loading && !error && filteredBookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-left text-gray-800 dark:text-gray-200">
                <th className="py-2 px-4 border-b dark:border-gray-700">User Name</th>
                <th className="py-2 px-4 border-b dark:border-gray-700">Court</th>
                <th className="py-2 px-4 border-b dark:border-gray-700">Date</th>
                <th className="py-2 px-4 border-b dark:border-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-center"
                >
                  <td className="py-2 px-4 border-b dark:border-gray-700">{booking.userName}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-700">{booking.court}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-700">{booking.date}</td>
                  <td className="py-2 px-4 border-b dark:border-gray-700">{booking.time}</td>
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
