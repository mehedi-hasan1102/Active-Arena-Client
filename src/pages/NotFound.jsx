import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="flex justify-center items-center min-h-[calc(100vh-80px)] sm:min-h-screen p-4
        bg-gradient-to-br from-emerald-50 via-white to-cyan-50
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
    >
      <Helmet>
        <title>404 Not Found - ActiveArena</title>
      </Helmet>

      <div
        className="w-full max-w-4xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md
          rounded-2xl shadow-xl dark:shadow-emerald-500/20 overflow-hidden
          border border-gray-200 dark:border-zinc-700 transition-colors duration-300"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side */}
          <div
            className="lg:w-1/2 p-8 md:p-10
              bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800
              flex flex-col justify-center transition-colors duration-300"
          >
            <div className="text-center lg:text-left space-y-6">
              <h1 className="text-7xl md:text-8xl font-extrabold text-emerald-600 dark:text-emerald-400">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
                Oops! Page not found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                The page you're looking for doesn't exist or might have been moved.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600
                    hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold shadow-md hover:shadow-lg transition-all text-center
                    dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900"
                >
                  Go Back Home
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className="lg:w-1/2 p-8 flex items-center justify-center
              bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
          >
            <img
              src="https://i.ibb.co/C3jBhrv7/404-Error-bro.png"
              alt="404 Illustration"
              className="w-full max-w-xs md:max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
