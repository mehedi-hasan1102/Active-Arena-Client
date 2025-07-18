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
        const res = await fetch(
          "http://localhost:5000/bookings?status=Approved&paymentStatus=paid"
        );
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
    <div className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center">📋 Confirmed Bookings</h1>

      {/* <input
        type="text"
        placeholder="Search by user email, court, date or time..."
        className="w-full max-w-xl mx-auto mb-8 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search bookings"
      /> */}

      <div className="flex justify-center mb-8">
  <input
    type="text"
    placeholder="Search by user email, court, date or time..."
    className="w-full max-w-xl px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    aria-label="Search bookings"
  />
</div>


      {loading && (
        <p className="text-center text-lg py-12 text-gray-800 dark:text-gray-200">
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
        <div className="overflow-x-auto rounded-md border border-gray-300 dark:border-gray-700 shadow-md">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  User Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Court
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Date
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Time Slots
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking._id?.$oid || booking._id || booking.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {booking.userEmail}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {booking.courtName}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-gray-700 dark:text-gray-300">
                    {new Date(booking.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-gray-700 dark:text-gray-300">
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
