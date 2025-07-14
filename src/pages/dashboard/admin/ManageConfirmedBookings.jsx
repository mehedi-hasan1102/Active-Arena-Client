import React, { useState } from 'react';

const ManageConfirmedBookings = () => {
  const [bookings] = useState([
    { id: 1, userName: 'Alice', court: 'Court 1', date: '2025-07-10', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, userName: 'Bob', court: 'Court 3', date: '2025-07-11', time: '02:00 PM', status: 'Confirmed' },
    { id: 3, userName: 'Charlie', court: 'Court 2', date: '2025-07-12', time: '04:00 PM', status: 'Confirmed' },
    { id: 4, userName: 'David', court: 'Court 1', date: '2025-07-13', time: '09:00 AM', status: 'Pending' }, // Example non-confirmed
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking =>
    booking.status === 'Confirmed' &&
    (booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.court.toLowerCase().includes(searchTerm.toLowerCase()) ||
     booking.date.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Confirmed Bookings</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user, court, or date..."
          className="p-2 border rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">Court</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">{booking.userName}</td>
                <td className="py-2 px-4 border-b text-center">{booking.court}</td>
                <td className="py-2 px-4 border-b text-center">{booking.date}</td>
                <td className="py-2 px-4 border-b text-center">{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageConfirmedBookings;