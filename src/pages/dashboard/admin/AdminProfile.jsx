// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../../context/Provider/AuthProvider';

// const AdminProfile = () => {
//   const { user } = useAuth();
//   const [counts, setCounts] = useState({
//     courts: 0,
//     users: 0,
//     members: 0,
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       // Simulated delay for mock data
//       setTimeout(() => {
//         setCounts({
//           courts: 12,
//           users: 200,
//           members: 75,
//         });
//       }, 1000);
//     };
//     fetchCounts();
//   }, []);

//   return (
//     <div className="p-4 md:p-6">
//       <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-300">Admin Profile</h1>

//       {/* Profile section */}
//       <div className="flex items-center gap-6 mb-10">
//         <img
//           src={user?.photoURL || 'https://via.placeholder.com/150'}
//           alt="Admin Avatar"
//           className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow-md"
//         />
//         <div className="text-gray-800 dark:text-gray-100 space-y-1">
//           <p><span className="font-semibold text-gray-700 dark:text-gray-300">Name:</span> {user?.displayName}</p>
//           <p><span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span> {user?.email}</p>
//         </div>
//       </div>

//       {/* Stats cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-blue-500 text-white rounded-xl p-6 shadow-md text-center">
//           <h2 className="text-lg font-semibold mb-2">Total Courts</h2>
//           <p className="text-4xl font-bold">{counts.courts}</p>
//         </div>
//         <div className="bg-green-500 text-white rounded-xl p-6 shadow-md text-center">
//           <h2 className="text-lg font-semibold mb-2">Total Users</h2>
//           <p className="text-4xl font-bold">{counts.users}</p>
//         </div>
//         <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-md text-center">
//           <h2 className="text-lg font-semibold mb-2">Total Members</h2>
//           <p className="text-4xl font-bold">{counts.members}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/Provider/AuthProvider";

const AdminProfile = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState({
    courts: 0,
    users: 0,
    members: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [courtsRes, usersRes] = await Promise.all([
          fetch("http://localhost:5000/courts"),
          fetch("http://localhost:5000/users"),
        ]);
        const courtsData = await courtsRes.json();
        const usersData = await usersRes.json();

        const totalCourts = courtsData.courts?.length || 0;
        const totalUsers = usersData.users?.length || 0;
        const totalMembers = usersData.users
          ? usersData.users.filter((u) => u.role === "member").length
          : 0;

        setCounts({
          courts: totalCourts,
          users: totalUsers,
          members: totalMembers,
        });
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading profile stats...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-300">
        Admin Profile
      </h1>

      {/* Profile section */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 shadow-md"
        />
        <div className="text-gray-800 dark:text-gray-100 space-y-1">
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Name:
            </span>{" "}
            {user?.displayName || "Anonymous"}
          </p>
          <p>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Email:
            </span>{" "}
            {user?.email}
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white rounded-xl p-6 shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Total Courts</h2>
          <p className="text-4xl font-bold">{counts.courts}</p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-6 shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-4xl font-bold">{counts.users}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Total Members</h2>
          <p className="text-4xl font-bold">{counts.members}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
