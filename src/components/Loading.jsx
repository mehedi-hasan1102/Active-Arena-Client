// import { Commet } from "react-loading-indicators";

// const Loading = () => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Background blur layer */}
//       <div className="absolute inset-0 backdrop-blur-sm bg-blue-100/40 dark:bg-zinc-900/60"></div>

//       {/* Loader container */}
//       <div className="relative z-10 p-6 rounded-md bg-white/90 dark:bg-zinc-800/90 shadow-lg border border-blue-200 dark:border-blue-700 flex items-center gap-4">
//         <Commet color="#2563eb" size="medium" />
//         <span className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
//           Please Wait . . .
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Loading;
import React from "react";
import { Vortex } from "react-loader-spinner";
import { motion } from "framer-motion";

const Loading = ({ message = "Loading, please wait..." }) => {
  const isDark = document.documentElement.classList.contains("dark");

  // Color scheme matching your navbar
  const background = isDark ? "bg-zinc-900" : "bg-emerald-50";
  const colors = isDark
    ? ["#059669", "#06b6d4", "#3b82f6", "#8b5cf6", "#f97316", "#f43f5e"] // emerald-600, cyan-500, etc.
    : ["#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#f97316", "#f43f5e"];
  
  const textColor = isDark ? "text-emerald-400" : "text-emerald-600";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex flex-col justify-center items-center min-h-screen w-full ${background} transition-colors duration-300 gap-4 p-8`}
    >
      <motion.div
        animate={{
          rotate: 360,
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={colors}
        />
      </motion.div>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`text-lg font-medium ${textColor} text-center max-w-md`}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default Loading;
