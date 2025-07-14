
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../context/firebase/firebase.config";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || name || "No Name",
          email: user.email,
          role: "member",
        }),
      });
      const data = await response.json();
      console.log("User saved in DB:", data);
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

    if (!email.trim()) {
      setError("Email is required.");
      Swal.fire({
        icon: "error",
        title: "Email Required",
        text: "Please enter your email.",
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
        photoURL: photoURL,
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

  const handleFacebookSignup = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await saveUserToDB(result.user);
      Swal.fire({
        icon: "success",
        title: "Signed up with Facebook!",
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
        title: "Facebook Signup Failed",
        text: err.message,
        background: swalStyle.background,
        color: swalStyle.color,
      });
    }
  };

  return (
    <div
      className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 min-h-screen px-6 py-10
        bg-gradient-to-br from-blue-50 via-white to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
        transition-colors duration-300"
    >
      <Helmet>
        <title>Signup - ActiveArena</title>
      </Helmet>

      <form
        onSubmit={handleSignup}
        className="w-full md:w-1/2 max-w-md bg-white dark:bg-zinc-900 shadow-md dark:shadow-blue-800/30 p-10 rounded-md space-y-6"
      >
        <h2 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          className="w-full px-5 py-3 border border-blue-700 rounded-md
            dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Photo URL (optional)"
          className="w-full px-5 py-3 border border-blue-700 rounded-md
            dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-5 py-3 border border-blue-700 rounded-md
            dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-5 py-3 border border-blue-700 rounded-md
              dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-700 dark:text-blue-400"
            title={showPassword ? "Hide password" : "Show password"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Sign Up
        </button>

        <div className="divider dark:before:bg-blue-400 dark:after:bg-blue-400 text-blue-700 dark:text-blue-400">
          OR
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border-2 border-blue-700 text-blue-700 dark:text-blue-400
            hover:bg-blue-700 hover:text-white rounded-md py-3 font-semibold transition"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={handleFacebookSignup}
          className="w-full border-2 border-blue-700 text-blue-700 dark:text-blue-400
            hover:bg-blue-700 hover:text-white rounded-md py-3 font-semibold transition mt-3"
        >
          Continue with Facebook
        </button>

        <p className="text-center text-blue-700 dark:text-blue-400 text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:underline text-blue-700 dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </form>

      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/678SMLSZ/Sign-up-bro.png"
          alt="Signup illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Signup;
