
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../context/firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <Loading />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: name || user.displayName,
        photoURL: photoURL || user.photoURL,
      });

      Swal.fire({
        title: "Profile updated successfully!",
        icon: "success",
        background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
        color: document.documentElement.classList.contains("dark") ? "#4ade80" : "#166534",
        confirmButtonColor: "#16a34a",
      });

      setName("");
      setPhotoURL("");
      setError(null);
    } catch (err) {
      setError(err.message);
      Swal.fire({
        title: "Failed to update profile!",
        icon: "error",
        background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#fff",
        color: document.documentElement.classList.contains("dark") ? "#f3f4f6" : "#111",
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
        <title>Profile - ActiveArena</title>
      </Helmet>
      {/* Profile Form */}
      <div className="w-full md:w-1/2 max-w-md bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 shadow-md dark:shadow-blue-800/30 p-10 rounded-md space-y-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">
          Update Profile
        </h1>

        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/5r5C1fJ/user.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-600 dark:border-blue-500 shadow-lg object-cover"
          />
          <h2 className="mt-4 text-xl font-semibold text-blue-700 dark:text-blue-400">
            {user?.displayName || "Anonymous User"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-700 bg-opacity-90 text-red-700 dark:text-red-300 p-3 rounded-md text-sm text-center font-medium transition-colors duration-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 border border-blue-700 rounded-md
              dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            type="url"
            placeholder="Profile Image URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-5 py-3 border border-blue-700 rounded-md
              dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Profile Illustration */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://i.ibb.co/nMt5Tvrp/Update-bro.png"
          alt="Profile Illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Profile;
