
// import React from "react";

// const LocationSection = () => {
//   return (
//     <section
//       id="location"
//       className=" mx-auto px-6 py-16 bg-blue-50 dark:bg-gray-900 rounded-lg shadow-lg "
//     >
//       <h2 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 text-center mb-8">
//         Location
//       </h2>

//       <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
//         {/* Address */}
//         <div className="text-blue-900 dark:text-blue-100">
//           <h3 className="text-2xl font-semibold mb-4">ActiveArena Sports Club</h3>
//           <p className="mb-2">123 Sports Avenue, Greenfield City,</p>
//           <p className="mb-2">Dhaka, Bangladesh - 1212</p>
//           <p className="mb-2">Phone: +880 1700-123456</p>
//           <p className="mb-6">Email: info@activearena.com</p>

//           <a
//             href="https://www.google.com/maps/dir/?api=1&destination=123+Sports+Avenue,+Greenfield+City,+Dhaka"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
//           >
//             Navigate on Google Maps
//           </a>
//         </div>

//         {/* Google Map Embed */}
//         <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-md">
//           <iframe
//             title="ActiveArena Location Map"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.912312005212!2d90.39401271541404!3d23.750903094163033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7b0cc2304a3%3A0xf5f6ad0121a79190!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LocationSection;
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaDirections } from "react-icons/fa";

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
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
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800 py-24"
    >
      {/* Floating background elements */}
      <motion.div 
        animate="float"
        variants={floating}
        className="absolute -left-20 top-1/4 w-80 h-80 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-3xl"
      />
      <motion.div 
        animate="float"
        variants={floating}
        transition={{ delay: 1 }}
        className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-cyan-200/30 dark:bg-cyan-900/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="text-center mb-20"
        >
          <motion.div variants={item} className="inline-block mb-6">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 shadow-sm"
            >
              Find Us
            </motion.span>
          </motion.div>
          
          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Location</span>
          </motion.h2>
          
          <motion.p 
            variants={item}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Visit our world-class facilities in the heart of the city
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={controls}
          variants={container}
          className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto"
        >
          {/* Address Card */}
          <motion.div
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700"
          >
            <motion.h3 
              whileHover={{ x: 5 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center"
            >
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mr-3"
              >
                <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400" />
              </motion.span>
              ActiveArena Sports Club
            </motion.h3>

            <div className="space-y-4">
              {[
                {
                  icon: <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400" />,
                  text: "123 Sports Avenue, Greenfield City, Dhaka, Bangladesh - 1212"
                },
                {
                  icon: <FaPhone className="text-blue-500 dark:text-blue-400" />,
                  text: "+880 1700-123456"
                },
                {
                  icon: <FaEnvelope className="text-blue-500 dark:text-blue-400" />,
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
                  className="text-gray-600 dark:text-gray-300 flex items-center"
                >
                  <span className="mr-3">{contact.icon}</span>
                  {contact.text}
                </motion.p>
              ))}
            </div>

            <motion.a
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              href="https://www.google.com/maps/dir/?api=1&destination=123+Sports+Avenue,+Greenfield+City,+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-lg transition-all"
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
          </motion.div>

          {/* Map */}
          <motion.div
            variants={item}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-blue-500/10 dark:bg-blue-900/10"
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
              className="relative z-10 filter grayscale-20 hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationSection;