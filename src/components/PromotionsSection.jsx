
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FiGift, FiPercent, FiClipboard, FiShoppingCart } from "react-icons/fi";

const PromotionsSection = () => {
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

  const coupons = [
    { 
      code: "ACTIVE10", 
      discount: 10, 
      icon: <FiGift className="text-emerald-500 dark:text-emerald-400" />, 
      colorFrom: "from-emerald-400", 
      colorTo: "to-emerald-600" 
    },
    { 
      code: "SUMMER20", 
      discount: 20, 
      icon: <FiPercent className="text-cyan-500 dark:text-cyan-400" />, 
      colorFrom: "from-cyan-400", 
      colorTo: "to-cyan-600" 
    },
    { 
      code: "WELCOME15", 
      discount: 15, 
      icon: <FiClipboard className="text-blue-500 dark:text-blue-400" />, 
      colorFrom: "from-blue-400", 
      colorTo: "to-blue-600" 
    },
    { 
      code: "SPORTS5", 
      discount: 5, 
      icon: <FiShoppingCart className="text-amber-500 dark:text-amber-400" />, 
      colorFrom: "from-amber-400", 
      colorTo: "to-amber-600" 
    },
  ];

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

  const couponHover = {
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="promotions"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-20 transition-colors duration-300 rounded-xl"
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
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 shadow-sm transition-colors duration-300"
            >
              Limited Time Offers
            </motion.span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300"
          >
            Special <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 dark:from-emerald-400 dark:to-cyan-400">Promotions</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300"
          >
            Unlock exclusive discounts with these limited-time coupon codes for our sports facilities
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {coupons.map(({ code, discount, icon, colorFrom, colorTo }, index) => (
            <motion.div
              key={code}
              variants={itemVariants}
              whileHover="hover"
              variants={couponHover}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorFrom} ${colorTo} rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500`}></div>
              <div className="relative bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col items-center h-full border border-gray-100 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    transition: { 
                      duration: 5, 
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }
                  }}
                  className="text-4xl mb-4"
                >
                  {icon}
                </motion.div>
                <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                  Use Code
                </p>
                <motion.p 
                  whileHover={{ scale: 1.1 }}
                  className={`text-3xl font-extrabold mb-4 tracking-widest bg-gradient-to-r ${colorFrom} ${colorTo} bg-clip-text text-transparent`}
                >
                  {code}
                </motion.p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="font-bold">{discount}%</span> Discount
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-200"
                >
                  Copy Code
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
            * Offers valid until December 31, 2028. Cannot be combined with other promotions.
          </p>
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

export default PromotionsSection;
