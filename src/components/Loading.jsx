

// import React, { useState, useEffect } from "react";
// import { Vortex } from "react-loader-spinner";
// import { motion, AnimatePresence } from "framer-motion";

// const Loading = ({ message = "Loading, please wait..." }) => {
//   const [isDark, setIsDark] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     setIsDark(document.documentElement.classList.contains("dark"));

//     const interval = setInterval(() => {
//       setProgress(prev => (prev >= 100 ? 100 : prev + 10));
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   const background = isDark
//     ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700"
//     : "bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50";

//   const textColor = isDark ? "text-emerald-300" : "text-emerald-700";
//   const progressBg = isDark ? "bg-zinc-700/50" : "bg-white/30";
//   const progressFill = isDark ? "bg-emerald-400/80" : "bg-emerald-500/80";

//   const colors = isDark
//     ? ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#f97316", "#f43f5e"]
//     : ["#059669", "#06b6d4", "#3b82f6", "#8b5cf6", "#f97316", "#f43f5e"];

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`flex flex-col justify-center items-center min-h-screen w-full ${background} transition-colors duration-500 gap-8 p-8 relative overflow-hidden`}
//       >
//         {/* Blurred decorative blobs */}
//         <div className="absolute inset-0">
//           <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300/30 dark:bg-emerald-800/30 filter blur-3xl animate-blob"></div>
//           <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300/30 dark:bg-cyan-800/30 filter blur-3xl animate-blob animation-delay-2000"></div>
//           <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300/30 dark:bg-blue-800/30 filter blur-3xl animate-blob animation-delay-4000"></div>
//         </div>

//         {/* Loader */}
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="relative z-10"
//         >
//           <Vortex
//             visible={true}
//             height="100"
//             width="100"
//             ariaLabel="vortex-loading"
//             wrapperStyle={{}}
//             wrapperClass="vortex-wrapper"
//             colors={colors}
//           />
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.4, 0, 0.4],
//             }}
//             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute inset-0 rounded-full bg-emerald-400/20 -z-10"
//           />
//         </motion.div>

//         {/* Loading message */}
//         <motion.p
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//           className={`text-lg font-semibold ${textColor} text-center z-10`}
//         >
//           {message}
//         </motion.p>

//         {/* Progress bar */}
//         <div className="w-full max-w-sm relative z-10">
          
//         </div>

//         {/* Animated dots */}
//         <motion.div className="flex gap-2 mt-6 z-10">
//           {colors.map((color, index) => (
//             <motion.div
//               key={index}
//               animate={{
//                 y: [0, -10, 0],
//                 scale: [1, 1.2, 1],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 delay: index * 0.2,
//               }}
//               className="w-2 h-2 rounded-full"
//               style={{ backgroundColor: color }}
//             />
//           ))}
//         </motion.div>

//         {/* Blob animation styles */}
//         <style jsx>{`
//           @keyframes blob {
//             0% { transform: translate(0px,0px) scale(1); }
//             33% { transform: translate(30px,-50px) scale(1.1); }
//             66% { transform: translate(-20px,20px) scale(0.9); }
//             100% { transform: translate(0px,0px) scale(1); }
//           }
//           .animate-blob { animation: blob 7s infinite; }
//           .animation-delay-2000 { animation-delay: 2s; }
//           .animation-delay-4000 { animation-delay: 4s; }
//         `}</style>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default Loading;

import React, { useState, useEffect } from "react";
import { Vortex } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";

const Loading = ({ message = "Loading, please wait..." }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const background = isDark
    ? "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700"
    : "bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50";

  const textColor = isDark ? "text-emerald-300" : "text-emerald-700";

  const colors = isDark
    ? ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#f97316", "#f43f5e"]
    : ["#059669", "#06b6d4", "#3b82f6", "#8b5cf6", "#f97316", "#f43f5e"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col justify-center items-center min-h-screen w-full ${background} transition-colors duration-500 gap-8 p-8 relative overflow-hidden`}
      >
        {/* Blurred decorative blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-300/30 dark:bg-emerald-800/30 filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-300/30 dark:bg-cyan-800/30 filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-blue-300/30 dark:bg-blue-800/30 filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Loader */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10"
        >
          <Vortex
            visible={true}
            height="100"
            width="100"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={colors}
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-emerald-400/20 -z-10"
          />
        </motion.div>

        {/* Loading message */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`text-lg font-semibold ${textColor} text-center z-10`}
        >
          {message}
        </motion.p>

        {/* Animated dots */}
        <motion.div className="flex gap-2 mt-6 z-10">
          {colors.map((color, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </motion.div>

        {/* Blob animation styles */}
        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px,0px) scale(1); }
            33% { transform: translate(30px,-50px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
            100% { transform: translate(0px,0px) scale(1); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
