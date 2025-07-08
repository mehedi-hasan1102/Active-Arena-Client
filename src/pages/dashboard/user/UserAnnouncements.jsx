
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion as Motion } from 'framer-motion';

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const UserAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('https://your-backend-domain/announcements')
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error('Failed to load announcements:', err));
  }, []);

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>User Announcements - ActiveArena</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
        📢 Club Announcements
      </h1>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No announcements at the moment.
        </p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {announcements.map((item, index) => (
            <Motion.div
              key={item._id}
              className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md border-l-4 border-blue-500"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariant}
            >
              <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-200">{item.message}</p>
              <p className="text-sm text-right text-gray-500 dark:text-gray-400 mt-2">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </Motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAnnouncements;
