import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion as Motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/axiosInstance';
import { useAuth } from '../../../context/Provider/AuthProvider';
import Loading from '../../../components/Loading';

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const UserAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user, loading: authLoading } = useAuth();

  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: ['announcements', searchTerm],
    queryFn: async () => {
      const res = await axiosInstance.get('/announcements', {
        params: { title: searchTerm || undefined },
      });
      return res.data.announcements || [];
    },
    enabled: !!user && !authLoading, // Only run query if user is logged in and auth is not loading
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    Swal.fire({
      title: 'Error',
      text: error.response?.data?.error || 'Failed to load announcements',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white dark:bg-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>User Announcements - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        📢 Club Announcements
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by announcement title..."
          aria-label="Search announcements by title"
          className="w-full max-w-md p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Announcements List */}
      {isLoading ? (
        < Loading />
      ) : announcements.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No announcements at the moment.
        </p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {announcements.map((item, index) => (
            <Motion.div
              key={item._id}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-l-4 border-[#059669] rounded-lg shadow-md p-4"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
            >
              <h2 className="text-xl font-semibold text-[#059669] dark:text-[#059669] mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-200">{item.content}</p>
              <div className="flex justify-end mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAnnouncements;
