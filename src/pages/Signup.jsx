
// import { Helmet } from "react-helmet-async";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "../context/firebase/firebase.config";
// import Swal from "sweetalert2";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axiosInstance from '../api/axiosInstance';

// const googleProvider = new GoogleAuthProvider();


// const Signup = () => {
//   const [name, setName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const isDark = document.documentElement.classList.contains("dark");
//   const swalStyle = {
//     background: isDark ? "#18181b" : "#fff",
//     color: isDark ? "#4ade80" : "#166534",
//   };

//   const saveUserToDB = async (user) => {
//     try {
//       const response = await axiosInstance.post("/users", {
//         name: user.displayName || name || "No Name",
//         email: user.email,
//         role: "member",
//       });
//       const data = response.data;
//       console.log("User saved in DB:", data);
//     } catch (error) {
//       console.error("Failed to save user:", error);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       setError("Name is required.");
//       Swal.fire({
//         icon: "error",
//         title: "Name Required",
//         text: "Please enter your full name.",
//         background: swalStyle.background,
//         color: swalStyle.color,
//       });
//       return;
//     }

//     if (!email.trim()) {
//       setError("Email is required.");
//       Swal.fire({
//         icon: "error",
//         title: "Email Required",
//         text: "Please enter your email.",
//         background: swalStyle.background,
//         color: swalStyle.color,
//       });
//       return;
//     }

//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
//     if (!passwordRegex.test(password)) {
//       const msg = "Password must contain uppercase, lowercase, and be at least 6 characters.";
//       setError(msg);
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Password",
//         text: msg,
//         background: swalStyle.background,
//         color: swalStyle.color,
//       });
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       await updateProfile(userCredential.user, {
//         displayName: name,
//         photoURL: photoURL,
//       });
//       await saveUserToDB(userCredential.user);
//       Swal.fire({
//         icon: "success",
//         title: "Signup Successful!",
//         background: swalStyle.background,
//         color: swalStyle.color,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//       Swal.fire({
//         icon: "error",
//         title: "Signup Failed",
//         text: err.message,
//         background: swalStyle.background,
//         color: swalStyle.color,
//       });
//     }
//   };

//   const handleGoogleSignup = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       await saveUserToDB(result.user);
//       Swal.fire({
//         icon: "success",
//         title: "Signed up with Google!",
//         background: swalStyle.background,
//         color: swalStyle.color,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//       Swal.fire({
//         icon: "error",
//         title: "Google Signup Failed",
//         text: err.message,
//         background: swalStyle.background,
//         color: swalStyle.color,
//       });
//     }
//   };


//   return (
//     <div
//       className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 min-h-screen px-6 py-10
//         bg-gradient-to-br from-blue-50 via-white to-blue-100
//         dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
//         transition-colors duration-300"
//     >
//       <Helmet>
//         <title>Signup - ActiveArena</title>
//       </Helmet>

//       <form
//         onSubmit={handleSignup}
//         className="w-full md:w-1/2 max-w-md bg-white dark:bg-zinc-900 shadow-md dark:shadow-blue-800/30 p-10 rounded-md space-y-6"
//       >
//         <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">
//           Sign Up
//         </h2>

//         {error && (
//           <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium">
//             {error}
//           </p>
//         )}

//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full px-5 py-3 border border-blue-700 rounded-md
//             dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
//             focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Photo URL (optional)"
//           className="w-full px-5 py-3 border border-blue-700 rounded-md
//             dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
//             focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           value={photoURL}
//           onChange={(e) => setPhotoURL(e.target.value)}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full px-5 py-3 border border-blue-700 rounded-md
//             dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
//             focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="w-full px-5 py-3 border border-blue-700 rounded-md
//               dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
//               focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-12"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-700 dark:text-blue-400"
//             title={showPassword ? "Hide password" : "Show password"}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
//             }}
//           >
//             {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//           </span>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition"
//         >
//           Sign Up
//         </button>

//         <div className="divider dark:before:bg-blue-400 dark:after:bg-blue-400 text-blue-700 dark:text-blue-400">
//           OR
//         </div>

//         <button
//           type="button"
//           onClick={handleGoogleSignup}
//           className="w-full border-2 border-blue-700 text-blue-700 dark:text-blue-400
//             hover:bg-blue-700 hover:text-white rounded-md py-3 font-semibold transition"
//         >
//           Continue with Google
//         </button>

        

//         <p className="text-center text-blue-700 dark:text-blue-400 text-sm mt-5">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="font-semibold hover:underline text-blue-700 dark:text-blue-400"
//           >
//             Login
//           </Link>
//         </p>
//       </form>

//       <div className="w-full md:w-1/2 flex justify-center">
//         <img
//           src="https://i.ibb.co/678SMLSZ/Sign-up-bro.png"
//           alt="Signup illustration"
//           className="w-full max-w-md h-auto object-contain"
//         />
//       </div>
//     </div>
//   );
// };

// export default Signup;
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../context/firebase/firebase.config";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import axiosInstance from '../api/axiosInstance';

const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
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
      await axiosInstance.post("/users", {
        name: user.displayName || name || "No Name",
        email: user.email,
        role: "member",
      });
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      Swal.fire({
        icon: "error",
        title: "Name Required",
        text: "Please enter your full name.",
        background: swalStyle.background,
        color: swalStyle.color,
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      const msg = "Password must contain uppercase, lowercase, and be at least 6 characters.";
      setError(msg);
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: msg,
        background: swalStyle.background,
        color: swalStyle.color,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || undefined,
      });
      await saveUserToDB(userCredential.user);
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        background: swalStyle.background,
        color: swalStyle.color,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message,
        background: swalStyle.background,
        color: swalStyle.color,
      });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToDB(result.user);
      Swal.fire({
        icon: "success",
        title: "Signed up with Google!",
        background: swalStyle.background,
        color: swalStyle.color,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Google Signup Failed",
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
      className="flex justify-center items-center min-h-[calc(100vh-80px)] sm:min-h-screen p-4
        bg-gradient-to-br from-emerald-50 via-white to-cyan-50
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 pt-12"
    >
      <Helmet>
        <title>Signup - ActiveArena</title>
      </Helmet>

      {/* Unified Card */}
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm
          rounded-2xl shadow-xl dark:shadow-emerald-500/10 overflow-hidden
          border border-gray-200 dark:border-zinc-700"
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Side - Image (Hidden on mobile) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden sm:block lg:w-1/2 p-6 md:p-8 bg-gradient-to-br from-emerald-100 to-cyan-100
              dark:from-emerald-900/30 dark:to-cyan-900/30 flex flex-col justify-center"
          >
            <div className="text-center space-y-4">
              <motion.img
                src="https://i.ibb.co/678SMLSZ/Sign-up-bro.png"
                alt="Signup illustration"
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
                  Join ActiveArena
                </motion.h2>
                <motion.p
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm md:text-base text-gray-600 dark:text-gray-400"
                >
                  Create your account to get started
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10"
          >
            {/* Mobile-only header */}
            <div className="sm:hidden mb-6 text-center">
              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                Join ActiveArena
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create your account
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4 sm:space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 sm:p-3 text-xs sm:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-zinc-600 rounded-lg
                      bg-white/50 dark:bg-zinc-800/50 dark:text-gray-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-zinc-600 rounded-lg
                      bg-white/50 dark:bg-zinc-800/50 dark:text-gray-200
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Email
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
                  <div className="relative">
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600
                  text-white font-medium sm:font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all
                  flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Create Account
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
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-zinc-700
                  text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg py-2 sm:py-3 font-medium transition text-sm sm:text-base"
              >
                <FaGoogle className="text-cyan-500 text-base sm:text-lg" />
                Google
              </motion.button>

              <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium sm:font-semibold text-emerald-600 dark:text-emerald-400 hover:underline transition"
                >
                  Login
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
