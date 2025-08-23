import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../context/firebase/firebase.config";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axiosInstance from '../api/axiosInstance';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isDark = document.documentElement.classList.contains("dark");
  const swalStyle = {
    background: isDark ? "#18181b" : "#fff",
    color: isDark ? "#4ade80" : "#166534",
  };

  const saveUserToDB = async (user) => {
    try {
      const res = await axiosInstance.post("/users", {
        name: user.displayName || "No Name",
        email: user.email,
        role: "member",
      });
      console.log("User saved in DB:", res.data);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one uppercase, one lowercase, and be 6+ characters.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToDB(userCredential.user);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        background: swalStyle.background,
        color: swalStyle.color,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
        background: swalStyle.background,
        color: swalStyle.color,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToDB(result.user);

      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        background: swalStyle.background,
        color: swalStyle.color,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message,
        background: swalStyle.background,
        color: swalStyle.color,
      });
    }
  };

  const resetPassword = async () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please enter your email first.",
        background: swalStyle.background,
        color: swalStyle.color,
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Reset Email Sent",
        text: "Check your inbox for instructions.",
        background: swalStyle.background,
        color: swalStyle.color,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to Send Email",
        text: err.message,
        background: swalStyle.background,
        color: swalStyle.color,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen p-4
        bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 "
    >
      <Helmet>
        <title>Login - ActiveArena</title>
      </Helmet>

      {/* Mobile-optimized Card */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
          rounded-2xl shadow-xl dark:shadow-emerald-500/10 overflow-hidden
          border border-gray-200 dark:border-zinc-700"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Welcome Section - Hidden on small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden sm:block lg:w-1/2 p-6 md:p-8 bg-gradient-to-br from-emerald-100 to-cyan-100
              dark:from-emerald-900/30 dark:to-cyan-900/30 flex flex-col justify-center"
          >
            <div className="text-center space-y-4">
              <motion.img
                src="https://i.ibb.co/xSJVc5d1/Tablet-login-bro.png"
                alt="Login illustration"
                className="w-full max-w-[200px] md:max-w-xs mx-auto"
                whileHover={{ 
                  scale: 1.05,
                  rotate: -2,
                  transition: { duration: 0.3 }
                }}
              />
              <div className="space-y-2">
                <motion.h2
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400"
                >
                  Welcome Back!
                </motion.h2>
                <motion.p
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm md:text-base  text-gray-600 dark:text-gray-400"
                >
                  Ready to book your next game session?
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Login Form - Full width on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 "
          >
            {/* Mobile-only welcome header */}
            <div className="sm:hidden mb-6 text-center">
              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                Welcome Back!
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Ready to book your next game?
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4 ">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-zinc-600 rounded-lg
                      bg-white/50 dark:bg-zinc-800/50 dark:text-gray-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Password
                  </label>
                  <div className="relative ">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-zinc-600 rounded-lg
                        bg-white/50 dark:bg-zinc-800/50 dark:text-gray-200
                        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition pr-10 sm:pr-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-1
                        text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400
                        transition rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 sm:p-3 text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={resetPassword}
                  className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition text-right"
                >
                  Forgot password?
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900"
              >
                Sign In
              </motion.button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-2 bg-white/80 dark:bg-zinc-900/80 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-200"
              >
                <FaGoogle className="text-cyan-500 text-base sm:text-lg" />
                Google
              </motion.button>

              <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium sm:font-semibold text-emerald-600 dark:text-emerald-400 hover:underline transition"
                >
                  Sign up
                </a>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;