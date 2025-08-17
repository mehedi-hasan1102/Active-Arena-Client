import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaDirections } from "react-icons/fa";

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    }
  };

  const floating = {
    float: {
      y: [-10, 10],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section
      id="location"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-24 transition-colors duration-300"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300 dark:bg-emerald-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300 dark:bg-cyan-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-800 mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30 animate-blob"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 shadow-sm transition-colors duration-300"
            >
              Find Us
            </motion.span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Location</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300"
          >
            Visit our world-class sports facilities in the heart of the city
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto"
        >
          {/* Address Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500 dark:from-emerald-500 dark:to-cyan-500"></div>
            <div className="relative bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700">
              <motion.h3 
                whileHover={{ x: 5 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center transition-colors duration-300"
              >
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mr-3"
                >
                  <FaMapMarkerAlt className="text-emerald-500 dark:text-emerald-400" />
                </motion.span>
                ActiveArena Sports Club
              </motion.h3>

              <div className="space-y-4">
                {[
                  {
                    icon: <FaMapMarkerAlt className="text-emerald-500 dark:text-emerald-400" />,
                    text: "123 Sports Avenue, Greenfield City, Dhaka, Bangladesh - 1212"
                  },
                  {
                    icon: <FaPhone className="text-blue-500 dark:text-blue-400" />,
                    text: "+880 1700-123456"
                  },
                  {
                    icon: <FaEnvelope className="text-cyan-500 dark:text-cyan-400" />,
                    text: "info@activearena.com"
                  }
                ].map((contact, index) => (
                  <motion.p 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.5 + index * 0.2 }
                    }}
                    className="text-gray-600 dark:text-gray-300 flex items-center transition-colors duration-300"
                  >
                    <span className="mr-3">{contact.icon}</span>
                    {contact.text}
                  </motion.p>
                ))}
              </div>

              <motion.a
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                href="https://www.google.com/maps/dir/?api=1&destination=123+Sports+Avenue,+Greenfield+City,+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-500 text-white rounded-lg shadow-lg transition-all duration-300"
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2"
                >
                  <FaDirections />
                </motion.span>
                Get Directions
              </motion.a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500 dark:from-emerald-500 dark:to-cyan-500 z-0"></div>
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-blue-500/10 dark:bg-blue-900/10 z-10"
            />
            <iframe
              title="ActiveArena Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.912312005212!2d90.39401271541404!3d23.750903094163033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b0cc2304a3%3A0xf5f6ad0121a79190!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-20 filter grayscale-20 hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Blob animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default LocationSection;