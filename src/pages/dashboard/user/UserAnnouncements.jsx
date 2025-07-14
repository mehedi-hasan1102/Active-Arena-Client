
// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { motion as Motion } from 'framer-motion';

// const cardVariant = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.1, duration: 0.5 },
//   }),
// };

// const UserAnnouncements = () => {
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/announcements')
//       .then((res) => res.json())
//       .then((data) => setAnnouncements(data))
//       .catch((err) => console.error('Failed to load announcements:', err));
//   }, []);

//   return (
//     <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
//       <Helmet>
//         <title>User Announcements - ActiveArena</title>
//       </Helmet>

//       <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
//         📢 Club Announcements
//       </h1>

//       {announcements.length === 0 ? (
//         <p className="text-center text-gray-600 dark:text-gray-300">
//           No announcements at the moment.
//         </p>
//       ) : (
//         <div className="space-y-6 max-w-3xl mx-auto">
//           {announcements.map((item, index) => (
//             <Motion.div
//               key={item._id}
//               className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md border-l-4 border-blue-500"
//               custom={index}
//               initial="hidden"
//               animate="visible"
//               variants={cardVariant}
//             >
//               <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
//                 {item.title}
//               </h2>
//               <p className="text-gray-700 dark:text-gray-200">{item.message}</p>
//               <p className="text-sm text-right text-gray-500 dark:text-gray-400 mt-2">
//                 {new Date(item.date).toLocaleDateString()}
//               </p>
//             </Motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserAnnouncements;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion as Motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/axiosInstance';

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

  // Fetch announcements
  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: ['announcements', searchTerm],
    queryFn: async () => {
      const res = await axiosInstance.get('/announcements', {
        params: { title: searchTerm || undefined },
      });
      return res.data.announcements || [];
    },
  });

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Show error with SweetAlert2
  if (error) {
    Swal.fire({
      title: 'Error',
      text: error.response?.data?.error || 'Failed to load announcements',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Helmet>
        <title>User Announcements - ActiveArena</title>
      </Helmet>

      <h1 className="text-2xl sm:text-3xl font-bold text-center text-purple-700 dark:text-purple-400 mb-6">
        📢 Club Announcements
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by announcement title..."
          className="w-full max-w-md p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Search announcements by title"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-lg dark:text-gray-300" role="status">
          🔄 Loading announcements...
        </div>
      ) : announcements.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No announcements at the moment.
        </p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {announcements.map((item, index) => (
            <Motion.div
              key={item._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border-l-4 border-purple-500"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
            >
              <h2 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-200">{item.content}</p>
              <div className="flex justify-between mt-2">
                {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                  By: {item.createdBy}
                </p> */}
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