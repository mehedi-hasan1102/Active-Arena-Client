// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../../context/Provider/AuthProvider";

// const MemberProfile = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalBookings: 0,
//     upcomingBookings: 0,
//     membershipLevel: "Basic",
//   });

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchBookings = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/bookings");
//         const data = await res.json();

//         // Assuming data.bookings is an array of booking objects
//         const userBookings = data.bookings.filter(
//           (booking) => booking.email === user.email
//         );

//         const now = new Date();
//         const upcomingCount = userBookings.filter(
//           (booking) => new Date(booking.date) > now
//         ).length;

//         // You can customize membership logic here based on bookings or user data
//         let membershipLevel = "Basic";
//         if (userBookings.length > 10) membershipLevel = "Gold";
//         else if (userBookings.length > 5) membershipLevel = "Silver";

//         setStats({
//           totalBookings: userBookings.length,
//           upcomingBookings: upcomingCount,
//           membershipLevel,
//         });
//       } catch (err) {
//         console.error("Failed to fetch bookings:", err);
//       }
//     };

//     fetchBookings();
//   }, [user?.email]);

//   return (
//     <div className="p-4 md:p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-300">
//         Member Profile
//       </h1>

//       {/* Profile section */}
//       <div className="flex items-center gap-6 mb-10">
//         <img
//           src={user?.photoURL || "https://via.placeholder.com/150"}
//           alt="Member Avatar"
//           className="w-24 h-24 rounded-full object-cover border-4 border-green-400 shadow-md"
//         />
//         <div className="text-gray-800 dark:text-gray-100 space-y-1">
//           <p>
//             <span className="font-semibold text-gray-700 dark:text-gray-300">
//               Name:
//             </span>{" "}
//             {user?.displayName || "Anonymous User"}
//           </p>
//           <p>
//             <span className="font-semibold text-gray-700 dark:text-gray-300">
//               Email:
//             </span>{" "}
//             {user?.email}
//           </p>
//         </div>
//       </div>

//       {/* Stats cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-green-500 text-white rounded-xl p-6 shadow-md text-center">
//           <h2 className="text-lg font-semibold mb-2">Bookings Made</h2>
//           <p className="text-4xl font-bold">{stats.totalBookings}</p>
//         </div>
//         <div className="bg-blue-500 text-white rounded-xl p-6 shadow-md text-center">
//           <h2 className="text-lg font-semibold mb-2">Upcoming Bookings</h2>
//           <p className="text-4xl font-bold">{stats.upcomingBookings}</p>
//         </div>
//         <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-md text-center">
//           <h2 className="text-lg font-semibold mb-2">Membership Level</h2>
//           <p className="text-4xl font-bold">{stats.membershipLevel}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemberProfile;
import React from 'react';
import { useAuth } from '../../../context/Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/axiosInstance';

const MemberProfile = () => {
  const { user } = useAuth();

  // Fetch user data
  const { data: userData, isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosInstance.get('/users', { params: { email: user.email } });
      return res.data.user || null;
    },
    enabled: !!user?.email,
  });

  // Fetch bookings
  const { data: bookings = [], isLoading: isBookingsLoading, error: bookingsError } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosInstance.get('/bookings', { params: { userEmail: user.email } });
      return res.data.bookings || [];
    },
    enabled: !!user?.email,
  });

  // Calculate stats
  const stats = {
    totalBookings: bookings.length,
    upcomingBookings: bookings.filter((booking) => new Date(booking.date) > new Date()).length,
    membershipLevel: bookings.length > 10 ? 'Gold' : bookings.length > 5 ? 'Silver' : 'Basic',
  };

  // Show errors with SweetAlert2
  if (userError || bookingsError) {
    Swal.fire({
      title: 'Error',
      text: userError?.response?.data?.error || bookingsError?.response?.data?.error || 'Failed to load profile data',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300 text-center">
        My Profile
      </h1>

      {/* Loading State */}
      {(isUserLoading || isBookingsLoading) && (
        <div className="text-center py-10 text-lg dark:text-gray-300" role="status">
          🔄 Loading profile...
        </div>
      )}

      {/* Profile Section */}
      {user && !isUserLoading && !isBookingsLoading && (
        <>
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt="Member Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-400 shadow-md"
              aria-label="User profile picture"
            />
            <div className="text-gray-800 dark:text-gray-100 space-y-1 text-center sm:text-left">
              <p>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Name: </span>
                {user?.displayName || 'Anonymous User'}
              </p>
              <p>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Email: </span>
                {user?.email}
              </p>
              <p>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Member Since: </span>
                {userData?.memberSince
                  ? new Date(userData.memberSince).toLocaleDateString()
                  : 'Not a member yet'}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-500 text-white rounded-xl p-6 shadow-md text-center">
              <h2 className="text-lg font-semibold mb-2">Bookings Made</h2>
              <p className="text-4xl font-bold">{stats.totalBookings}</p>
            </div>
            <div className="bg-blue-500 text-white rounded-xl p-6 shadow-md text-center">
              <h2 className="text-lg font-semibold mb-2">Upcoming Bookings</h2>
              <p className="text-4xl font-bold">{stats.upcomingBookings}</p>
            </div>
            <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-md text-center">
              <h2 className="text-lg font-semibold mb-2">Membership Level</h2>
              <p className="text-4xl font-bold">{stats.membershipLevel}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberProfile;