import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../context/firebase/firebase.config";
import { motion as Motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const numberPulse = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { yoyo: Infinity, duration: 0.6, ease: "easeInOut" },
  },
};

const Overview = () => {
  const [user] = useAuthState(auth);
  const [stats, setStats] = useState({ totalBookings: 0, myBookings: 0 });

  useEffect(() => {
    if (!user?.email) return;

    fetch("https://your-backend-domain/bookings")
      .then((res) => res.json())
      .then((data) => {
        const myBookings = data.filter((item) => item.email === user.email);
        setStats({ totalBookings: data.length, myBookings: myBookings.length });
      });
  }, [user?.email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 px-4 py-12 transition-colors duration-300">
      <Helmet>
        <title>Dashboard Overview - ActiveArena</title>
      </Helmet>

      <div className="w-full max-w-6xl space-y-8">
        {/* Welcome */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-2">
            Welcome to ActiveArena Dashboard!
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Here’s a quick look at your court booking stats.
          </p>
        </Motion.div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar */}
          <Motion.div
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl text-center cursor-default"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Motion.img
                src={user?.photoURL || "https://i.ibb.co/5r5C1fJ/user.png"}
                alt="User Avatar"
                className="w-full h-full rounded-full border-4 border-blue-500 dark:border-blue-400 object-cover shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                ✅ {user?.role || "User"}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
              {user?.displayName || "Anonymous"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
          </Motion.div>

          {/* Total Bookings */}
          <Motion.div
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl text-center cursor-default"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">
              🏟 Total Bookings
            </h3>
            <Motion.p
              className="text-5xl font-extrabold text-blue-700 dark:text-blue-400"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={numberPulse}
            >
              {stats.totalBookings}
            </Motion.p>
          </Motion.div>

          {/* My Bookings */}
          <Motion.div
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl text-center cursor-default"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">
              🎯 My Bookings
            </h3>
            <Motion.p
              className="text-5xl font-extrabold text-blue-700 dark:text-blue-400"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={numberPulse}
            >
              {stats.myBookings}
            </Motion.p>
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
