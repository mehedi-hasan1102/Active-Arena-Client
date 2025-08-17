

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
    <div className="pt-8"> {/* Added padding-top to account for fixed navbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6"
      >
        <Helmet>
          <title>About - ActiveArena Sports Club Management System</title>
        </Helmet>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-6xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
            rounded-3xl shadow-xl dark:shadow-emerald-500/10 overflow-hidden
            border border-gray-200 dark:border-zinc-700"
        >
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 dark:from-emerald-900/20 dark:to-cyan-900/20"></div>
            <div className="relative px-6 py-12 sm:py-16 md:py-20 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center mb-6"
              >
                <div className="p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-lg">
                  <FaFutbol className="text-white text-4xl" />
                </div>
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                About <span className="text-emerald-500">Active</span><span className="text-cyan-500">Arena</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Revolutionizing sports club management through innovative technology and user-focused design.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
            <div className="max-w-4xl mx-auto">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed"
              >
                ActiveArena is a comprehensive Sports Club Management System designed to facilitate efficient administration and seamless user engagement. Our platform integrates user registration, membership administration, court bookings, payment processing, and administrative oversight in one unified solution.
              </motion.p>

              {/* Features Grid - Responsive adjustments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-zinc-800/50 p-5 sm:p-6 rounded-xl shadow-sm dark:shadow-none
                      border border-gray-100 dark:border-zinc-700 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
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
                className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 dark:from-emerald-900/20 dark:to-cyan-900/20
                  p-5 sm:p-6 md:p-8 rounded-xl border border-emerald-500/20 dark:border-emerald-400/20"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <FaBullseye className="text-xl sm:text-2xl text-emerald-500 dark:text-emerald-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    Our Vision
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  To be the definitive platform that empowers sports clubs worldwide to operate efficiently while providing members with an exceptional, engaging experience that fosters community and active participation.
                </p>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 sm:mt-12 text-center"
              >
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                  Ready to transform your sports club experience?
                </p>
                <div className="flex items-center justify-center gap-2 text-emerald-500 dark:text-emerald-400 font-medium text-sm sm:text-base">
                  <FaFutbol className="animate-bounce" />
                  <span>Join the ActiveArena community today</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;