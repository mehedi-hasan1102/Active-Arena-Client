
// import React from "react";

// const coupons = [
//   { code: "ABC", discount: 5 },
//   { code: "SUMMER20", discount: 20 },
//   { code: "WELCOME10", discount: 10 },
//   { code: "SPORTS5", discount: 5 },
// ];

// const PromotionsSection = () => {
//   return (
//     <section
//       id="promotions"
//       className=" mx-auto px-6 py-16 bg-blue-50 dark:bg-gray-900 rounded-lg shadow-md transition-colors duration-300"
//     >
//       <h2 className="text-4xl font-extrabold text-center text-blue-900 dark:text-blue-300 mb-12">
//         Special Promotions & Discount Coupons
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
//         {coupons.map(({ code, discount }) => (
//           <div
//             key={code}
//             className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl p-6 flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//           >
//             <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
//               Coupon Code
//             </p>
//             <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 mb-4 tracking-widest">
//               {code}
//             </p>
//             <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
//               Get <span className="font-bold">{discount}%</span> OFF
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default PromotionsSection;
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FiGift, FiPercent, FiClipboard, FiShoppingCart } from "react-icons/fi";

const PromotionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const coupons = [
    { 
      code: "ABC", 
      discount: 5, 
      icon: <FiGift />, 
      colorFrom: "from-blue-400", 
      colorTo: "to-blue-600" 
    },
    { 
      code: "SUMMER20", 
      discount: 20, 
      icon: <FiPercent />, 
      colorFrom: "from-amber-400", 
      colorTo: "to-amber-600" 
    },
    { 
      code: "WELCOME10", 
      discount: 10, 
      icon: <FiClipboard />, 
      colorFrom: "from-emerald-400", 
      colorTo: "to-emerald-600" 
    },
    { 
      code: "SPORTS5", 
      discount: 5, 
      icon: <FiShoppingCart />, 
      colorFrom: "from-purple-400", 
      colorTo: "to-purple-600" 
    },
  ];

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
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-zinc-900 dark:to-zinc-800 py-20"
    >
      {/* Floating background elements */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          transition: {
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }
        }}
        className="absolute -left-20 top-1/4 w-80 h-80 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-3xl"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0],
          y: [0, 50, 0],
          transition: {
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: 3
          }
        }}
        className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-cyan-200/30 dark:bg-cyan-900/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={container}
          className="text-center mb-16"
        >
          <motion.div variants={item} className="inline-block mb-6">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 shadow-sm"
            >
              Limited Time Offers
            </motion.span>
          </motion.div>
          
          <motion.h2 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Special <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Promotions</span>
          </motion.h2>
          
          <motion.p 
            variants={item}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Unlock exclusive discounts with these limited-time coupon codes
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={controls}
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {coupons.map(({ code, discount, icon, colorFrom, colorTo }, index) => (
            <motion.div
              key={code}
              variants={item}
              whileHover="hover"
              variants={couponHover}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorFrom} ${colorTo} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500`}></div>
              <div className="relative bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col items-center h-full">
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
                  className="text-4xl mb-4 text-gray-700 dark:text-gray-300"
                >
                  {icon}
                </motion.div>
                <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                  Use Code
                </p>
                <motion.p 
                  whileHover={{ scale: 1.1 }}
                  className={`text-3xl font-extrabold mb-4 tracking-widest bg-gradient-to-r ${colorFrom} ${colorTo} bg-clip-text text-transparent`}
                >
                  {code}
                </motion.p>
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  <span className="font-bold">{discount}%</span> Discount
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full py-2 text-sm font-medium rounded-lg bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
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
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            * Offers valid until December 31, 2028. Cannot be combined with other promotions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PromotionsSection;