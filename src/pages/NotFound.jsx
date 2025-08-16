

// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import Switch from "../components/DarkModeSidebar";

// const NotFound = () => {
//   return (
//     <div
//       className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 min-h-screen px-6 py-12
//       bg-gradient-to-br from-blue-50 via-white to-blue-100
//       dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
//       transition-colors duration-300"
//     >
//       <Helmet>
//         <title>404 Not Found - ActiveArena</title>
//       </Helmet>
//       {/* Left Text */}
//       <div className="w-full md:w-1/2 max-w-md text-center md:text-left space-y-6">
//         <h1 className="text-7xl font-extrabold text-blue-700 dark:text-blue-400">
//           404
//         </h1>
//         <h2 className="text-3xl font-semibold text-blue-900 dark:text-blue-300">
//           Oops! Page not found.
//         </h2>
//         <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
//           The page you’re looking for doesn’t exist, is growing elsewhere, or might have been pruned.
//         </p>

//         <Link
//           to="/"
//           className="inline-block px-8 py-3 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold
//           dark:bg-blue-500 dark:hover:bg-blue-600 transition"
//         >
//           Go Back Home
//         </Link>

//         <div className="mt-4">
//           <Switch />
//         </div>
//       </div>

//       {/* Right Illustration */}
//       <div className="w-full md:w-1/2 flex justify-center">
//         <img
//           src="https://i.ibb.co/C3jBhrv7/404-Error-bro.png"
//           alt="404 Illustration"
//           className="w-full max-w-md h-auto object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default NotFound;
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Switch from "../components/DarkModeSidebar";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-[calc(100vh-80px)] sm:min-h-screen p-4
        bg-gradient-to-br from-emerald-50 via-white to-cyan-50
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
    >
      <Helmet>
        <title>404 Not Found - ActiveArena</title>
      </Helmet>

      {/* Unified Card */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-4xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
          rounded-2xl shadow-xl dark:shadow-emerald-500/10 overflow-hidden
          border border-gray-200 dark:border-zinc-700"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/2 p-8 md:p-10 bg-gradient-to-br from-emerald-100 to-cyan-100
              dark:from-emerald-900/30 dark:to-cyan-900/30 flex flex-col justify-center"
          >
            <div className="text-center lg:text-left space-y-6">
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-7xl md:text-8xl font-extrabold text-emerald-600 dark:text-emerald-400"
              >
                404
              </motion.h1>
              <motion.h2
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200"
              >
                Oops! Page not found
              </motion.h2>
              <motion.p
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                The page you're looking for doesn't exist or might have been moved.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600
                    text-white font-semibold shadow-lg hover:shadow-emerald-500/20 transition-all text-center"
                >
                  Go Back Home
                </Link>
                {/* <div className="flex items-center justify-center">
                  <Switch />
                </div> */}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="lg:w-1/2 p-8 flex items-center justify-center"
          >
            <motion.img
              src="https://i.ibb.co/C3jBhrv7/404-Error-bro.png"
              alt="404 Illustration"
              className="w-full max-w-xs md:max-w-md h-auto object-contain"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;