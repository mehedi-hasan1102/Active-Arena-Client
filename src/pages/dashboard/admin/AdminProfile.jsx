import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/Provider/AuthProvider";
import Loading from "../../../components/Loading";
import axiosInstance from '../../../api/axiosInstance';

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
          axiosInstance.get("/courts"),
          axiosInstance.get("/users"),
        ]);
        const courtsData = courtsRes.data;
        const usersData = usersRes.data;

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
    return (
     < Loading />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300  text-emerald-600 dark:text-emerald-400 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400">
        Admin Profile
      </h1>

      {/* Profile section */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-emerald-300 shadow-md"
        />
        <div className="space-y-1">
          <p>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Name:
            </span>{" "}
            {user?.displayName || "Anonymous"}
          </p>
          <p>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Email:
            </span>{" "}
            {user?.email}
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Courts</h2>
          <p className="text-4xl font-bold text-emerald-600">{counts.courts}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-4xl font-bold text-emerald-600">{counts.users}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 rounded-lg shadow-md p-4 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Members</h2>
          <p className="text-4xl font-bold text-emerald-600">{counts.members}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;