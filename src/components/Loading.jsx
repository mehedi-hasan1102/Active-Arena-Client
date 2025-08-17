
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
