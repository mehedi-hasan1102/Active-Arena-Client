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
        const res = await fetch("http://localhost:5000/bookings?status=confirmed"); // Your API endpoint
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();

        // Assuming your API returns an array of bookings
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
      (booking.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.court?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.date?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      booking.status.toLowerCase() === "confirmed"
  );

  if (loading)
    return <p className="text-center py-10 text-gray-800 dark:text-gray-200">Loading bookings...</p>;

  if (error)
    return <p className="text-center py-10 text-red-600 dark:text-red-400">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">📋 Confirmed Bookings</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user, court, or date..."
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search bookings"
        />
      </div>
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No confirmed bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 dark:bg-zinc-800 dark:border-gray-700 rounded-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-200">
                <th className="py-2 px-4 border-b">User Name</th>
                <th className="py-2 px-4 border-b">Court</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700 text-center">
                  <td className="py-2 px-4 border-b">{booking.userName}</td>
                  <td className="py-2 px-4 border-b">{booking.court}</td>
                  <td className="py-2 px-4 border-b">{booking.date}</td>
                  <td className="py-2 px-4 border-b">{booking.time}</td>
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
