import { Helmet } from "react-helmet-async";
import React from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/Provider/AuthProvider";
import Swal from "sweetalert2";
import { motion as Motion } from "framer-motion";

const AddPlantPage = () => {
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(
        "https://project-web-b11-a10-plant-care-serv.vercel.app/plants",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "🌿 Plant Added!",
          icon: "success",
          confirmButtonColor: "#16a34a",
          background: document.documentElement.classList.contains("dark")
            ? "#18181b"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#4ade80"
            : "#166534",
        });
        form.reset();
      } else {
        toast.error(data.message || "Failed to add plant");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add plant");
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-blue-50 via-white to-blue-100
        dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
        min-h-screen flex items-center justify-center px-4 py-8 transition-colors duration-300"
    >
      <Helmet>
        <title>Add Plant - ActiveArena</title>
      </Helmet>
      <Motion.section
        className="w-full max-w-3xl p-10 bg-white dark:bg-zinc-900 rounded-md shadow-lg shadow-blue-200/50 dark:shadow-blue-600/50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 text-center mb-6">
          Add a New Plant
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Image URL
              </label>
              <input
                id="image"
                name="image"
                type="text"
                required
                className="input input-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            {/* Plant Name */}
            <div>
              <label
                htmlFor="plantName"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Plant Name
              </label>
              <input
                id="plantName"
                name="plantName"
                type="text"
                required
                className="input input-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                className="select select-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select a category</option>
                <option value="succulent">Succulent</option>
                <option value="fern">Fern</option>
                <option value="flowering">Flowering</option>
                <option value="cactus">Cactus</option>
                <option value="foliage">Foliage</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                className="textarea textarea-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            {/* Care Level */}
            <div>
              <label
                htmlFor="careLevel"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Care Level
              </label>
              <select
                id="careLevel"
                name="careLevel"
                required
                className="select select-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              >
                <option value="">Select care level</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="difficult">Difficult</option>
              </select>
            </div>

            {/* Watering Frequency */}
            <div>
              <label
                htmlFor="wateringFrequency"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Watering Frequency
              </label>
              <input
                id="wateringFrequency"
                name="wateringFrequency"
                type="text"
                required
                className="input input-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Last Watered Date */}
            <div>
              <label
                htmlFor="lastWateredDate"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Last Watered Date
              </label>
              <input
                id="lastWateredDate"
                name="lastWateredDate"
                type="date"
                required
                className="input input-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            {/* Next Watering Date */}
            <div>
              <label
                htmlFor="nextWateringDate"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Next Watered Date
              </label>
              <input
                id="nextWateringDate"
                name="nextWateringDate"
                type="date"
                required
                className="input input-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Health Status */}
            <div>
              <label
                htmlFor="healthStatus"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Health Status
              </label>
              <input
                id="healthStatus"
                name="healthStatus"
                type="text"
                required
                className="input input-bordered rounded-md w-full
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            {/* Added By (readonly) */}
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Added By
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered rounded-md w-full cursor-not-allowed
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            {/* Email (readonly) */}
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered rounded-md w-full cursor-not-allowed
                  dark:bg-zinc-800 dark:border-blue-400 dark:text-blue-300
                  border-blue-700 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          <Motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition mt-6"
          >
            🌱 Add Plant
          </Motion.button>
        </form>
      </Motion.section>
    </div>
  );
};

export default AddPlantPage;
