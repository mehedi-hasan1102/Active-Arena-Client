import { Helmet } from "react-helmet-async";
import React from "react";
import { motion } from "framer-motion";
import { FaFutbol, FaUsers, FaCog, FaMobileAlt, FaBullseye } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaUsers className="text-3xl text-emerald-500" />,
      title: "Streamlined Club Operations",
      description: "Role-based dashboards for users, members, and administrators with intuitive interfaces for reservations, approvals, and management."
    },
    {
      icon: <FaCog className="text-3xl text-cyan-500" />,
      title: "Comprehensive Management",
      description: "Full control over court bookings, payment processing, announcements, and promotional offers in one unified platform."
    },
    {
      icon: <FaMobileAlt className="text-3xl text-emerald-500" />,
      title: "User-Centric Experience",
      description: "Responsive design with real-time updates and secure authentication across all devices."
    },
    {
      icon: <FaBullseye className="text-3xl text-cyan-500" />,
      title: "Our Mission",
      description: "Foster vibrant sports communities by simplifying club management and enhancing member participation."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-[calc(100vh-80px)] sm:min-h-screen p-4 pt-12"
    >
      <Helmet>
        <title>About - ActiveArena</title>
      </Helmet>

      {/* Unified Card with gradient bg */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-5xl bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-sm
          rounded-2xl shadow-xl dark:shadow-emerald-500/10 overflow-hidden
          border border-gray-200 dark:border-zinc-700"
      >
        <div className="flex flex-col">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-8 md:p-10 text-center bg-transparent"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-lg">
                <FaFutbol className="text-white text-4xl" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="text-emerald-500">Active</span><span className="text-cyan-500">Arena</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Revolutionizing sports club management through innovative technology and user-focused design.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="px-6 md:px-10 pb-8 md:pb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-transparent p-5 sm:p-6 rounded-xl border border-gray-100 dark:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="px-6 md:px-10 pb-10"
          >
            <div className="bg-transparent p-6 rounded-xl border border-gray-100 dark:border-zinc-700">
              <div className="flex items-center gap-3 mb-3">
                <FaBullseye className="text-xl sm:text-2xl text-emerald-500 dark:text-emerald-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                To be the definitive platform that empowers sports clubs worldwide to operate efficiently while providing members with an exceptional, engaging experience that fosters community and active participation.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
